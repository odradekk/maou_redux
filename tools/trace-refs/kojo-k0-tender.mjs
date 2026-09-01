// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k0-tender.mjs
// 本分片给 rebase 后的加载器认；当前工作树仍把同块留在 trace-check.mjs，
// 让拆表前的校核继续绿。

export const FILES = [
  {
    js: 'ere/kojo/kojo-k0-tender.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '73-77',
        any: [/^@EVENTTRAIN$/m, /^FLAG:100 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '79-81',
        any: [/^@EVENTEND$/m, /^FLAG:100 = 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '674',
        any: [/^@KOJO_MESSAGE_COM_0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '674-5475',
        any: [/^@KOJO_MESSAGE_COM_0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '75',
        any: [/^FLAG:100 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '77',
        any: [/^\tFLAG:7 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '81',
        any: [/^FLAG:100 = 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6832-7209',
        any: [/^@SELF_KOJO_K0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6970-6990',
        any: [/^IF TFLAG:13 == 6$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6990',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7207',
        any: [/^TFLAG:13 = 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6836',
        any: [/IF TFLAG:13 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6838',
        any: [/\tIF Q == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6839',
        any: [
          /「哈啊啊…那孩子…%SAVESTR:ASSI%小姐的触感…还残留在身体上…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6840',
        any: [
          /%SAVESTR:TARGET%为了寻求%SAVESTR:ASSI%的残迹而把手指伸向了私处………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6842',
        any: [/\tELSEIF Q == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6843',
        any: [/「啊啊～…狗狗大人…还是狗狗大人的肉棒最棒～………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6844',
        any: [/%SAVESTR:TARGET%想着心爱的野狗，忍不住用自己的手指开始自慰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6845',
        any: [/「想做……哈啊……好想再和狗狗大人交尾………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6846',
        any: [/「狗狗大人滚烫的肉棒……粗糙的舌头……啊啊………我的狗狗大人……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6847',
        any: [
          /幻想着野狗的模样，%SAVESTR:TARGET%揉搓自己的乳房，用手指快速抽插着小穴，但似乎完全没法获得满足的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6848',
        any: [/「唔…狗狗大人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6850',
        any: [/^\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6852',
        any: [/\t\tIF TALENT:76 && \(CFLAG:261 < 4 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6853',
        any: [
          /「啊啊～…身体好痒…忍不住了…啊啊～自慰停不下来、只用手指完全不够啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6854',
        any: [/\t\t\tCFLAG:261 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6856',
        any: [/\t\tELSEIF TALENT:85 && \(CFLAG:261 < 3 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6857',
        any: [/「哈啊啊～…啊～啊啊～…不行了…躁动平息不下来…要变得…奇怪了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6858',
        any: [/\t\t\tCFLAG:261 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6860',
        any: [/\t\tELSEIF ABL:31 >= 3 && \(CFLAG:261 < 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6861',
        any: [/「嗯～嗯呼唔呜～…不行了…手停不下来…还想再被欺负………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6862',
        any: [/\t\t\tCFLAG:261 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6864',
        any: [/\t\tELSEIF CFLAG:261 < 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6865',
        any: [
          /「啊～…啊啊～…这是因为…身体太烫了…没办法…只能自慰了…啊～啊啊～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6866',
        any: [/\t\t\tCFLAG:261 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6867',
        any: [/^\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6868',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6869',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6874',
        any: [/IF TFLAG:13 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6876',
        any: [/\tIF TALENT:76 && \(CFLAG:262 < 5 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6877',
        any: [
          /「啊哈～…啊啊～…别人的小穴也…这么的美味呢…啊～～啊～…哈唔嗯～让我再奉仕吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6878',
        any: [/\t\tCFLAG:262 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6880',
        any: [/\tELSEIF TALENT:85 && \(CFLAG:262 < 4 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6881',
        any: [/「啊啊～…身体的躁动平息不下来…一起互相安慰吧…啊～啊啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6882',
        any: [/\t\tCFLAG:262 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6884',
        any: [/\tELSEIF ABL:33 >= 3 && \(CFLAG:262 < 3 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6885',
        any: [/「哈啊～～…百合真好～…让我们一起…变的更舒服吧…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6886',
        any: [/\t\tCFLAG:262 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6888',
        any: [/\tELSEIF ABL:22 >= 3 && \(CFLAG:262 < 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6889',
        any: [/「百合…原来是这么棒的事物啊………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6890',
        any: [/\t\tCFLAG:262 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6892',
        any: [/\tELSEIF CFLAG:262 < 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6893',
        any: [/「啊～嗯～…百合什么…啊～哈啊啊啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6894',
        any: [/\t\tCFLAG:262 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6895',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6896',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6901',
        any: [/IF TFLAG:13 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6903',
        any: [/\tIF TALENT:76 == 1 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6904',
        any: [
          /「嗯噗～…啾～…嘞噗～啾～啾呜啾呜唔呜呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6905',
        any: [
          /「啊、早上…嘞噗～嘞咯～…好…嗯呼呜…请把…精液…都给我吧…啾呜呜呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6906',
        any: [/%SAVESTR:TARGET%沉醉于濃厚的精液味道中继续着口腔奉仕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6908',
        any: [
          /「咻噜～咻噜～…啾唔呜唔呜呜…啊啊…这样精液就全部弄干净了呢…额呵呵、多谢款待%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6909',
        any: [/\t\tCFLAG:263 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6911',
        any: [/\tELSEIF TALENT:85 == 1 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6912',
        any: [/「啊啊…早上就这么精神…额呵呵、早上好、主人～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6913',
        any: [
          /「请在%SELF_CALL\(TARGET\)%的爱之口腔奉仕下…变的更舒服吧…嗯啾～嘞噗～咕啾呜…嘞咯～…嘞咯～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6914',
        any: [/%SAVESTR:TARGET%嘴边沾满了精液继续热情的进行着口腔奉仕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6916',
        any: [
          /「从早上…就能享用到主人的精液～…%SELF_CALL\(TARGET\)%真是个幸福的奴隷啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6917',
        any: [/\t\tCFLAG:263 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6919',
        any: [/\tELSEIF ABL:16 >= 5 && \(CFLAG:263 < 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6920',
        any: [/「嗯啾～…啾呜～…嘞咯～…请继续…射精吧…我会全部喝下去的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6922',
        any: [/「啊啊…精液…好美味啊～…啊～啊啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6923',
        any: [/\t\tCFLAG:263 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6925',
        any: [/\tELSEIF CFLAG:263 < 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6926',
        any: [/「啊啊…奉仕…是这么的…啊啊…嗯咻呜…嘞咯…啊姆呜………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6927',
        any: [/\t\tCFLAG:263 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6928',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6929',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6934',
        any: [/IF TFLAG:13 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6936',
        any: [/\tIF ABL:2 >= 4 && \(CFLAG:264 < 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6937',
        any: [/「啊啊～…小穴的躁动…平息不下来～…请帮帮我吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6938',
        any: [/\t\t\tIF TALENT:TARGET:75 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6939',
        any: [/「好美妙…小穴最棒了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6940',
        any: [/「已经…不能想象没有小穴的生活了………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6941',
        any: [/%SAVESTR:TARGET%神情陶醉的抱住了%NAME:MASTER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6942',
        any: [/^\t\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6943',
        any: [/\t\tCFLAG:264 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6945',
        any: [/\tELSEIF CFLAG:264 < 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6946',
        any: [/「啊～啊啊～…啊～…小穴好痒…嗯～呼呜～…啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6947',
        any: [/\t\tCFLAG:264 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6948',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6949',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6954',
        any: [/IF TFLAG:13 == 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6955',
        any: [/\tIF CFLAG:265 < 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6956',
        any: [/「晚上好………主人…有空吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6957',
        any: [/「身体痒的…受不了了呢…已经…不能…离开主人了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6958',
        any: [/「啊啊…要疯了…请抱我…主人～………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6960',
        any: [
          /「请不要在%SELF_CALL\(TARGET\)%満足之前…停下…不然我可是饶不了你的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6961',
        any: [/\t\tCFLAG:265 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6962',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6963',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6968',
        any: [/IF TFLAG:13 == 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6970',
        any: [/\tIF TALENT:85 && MARK:3 < 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6971',
        any: [/你把%SAVESTR:TARGET%卖掉了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6972',
        any: [/「啊啊…明明以为你了解了%SELF_CALL\(TARGET\)%对您的爱了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6973',
        any: [/「难道这从始至终都是%SELF_CALL\(TARGET\)%的錯覚吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6974',
        any: [/%SAVESTR:TARGET%伤心的擦着眼泪。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6975',
        any: [/「真是………太遗憾了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6976',
        any: [/^\s*PRINTFORM[WL]?\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6977',
        any: [/「…再见、祝你平安…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6979',
        any: [/\tELSEIF MARK:3 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6980',
        any: [/「永别了、我再也不想看到你的脸了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6982',
        any: [/\tELSEIF TALENT:76/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6983',
        any: [/「要把%SELF_CALL\(TARGET\)%卖了吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6984',
        any: [/「是吗…虽然和主人做爱…特别的爽呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6985',
        any: [
          /「诶？下一个主人也一定是个好主人？额呵呵、是吗～…在做爱上也能与你同等程度就太美妙了…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6987',
        any: [/^\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6988',
        any: [/「再见、主人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6989',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6992',
        any: [/\t\tCALL SELL_MATURO_K0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6993',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '6999',
        any: [/IF TFLAG:13 == 11/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7000',
        any: [/\tIF CFLAG:271 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7002',
        any: [/\t\tIF TALENT:9 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7003',
        any: [
          /「啊哈～啊哈～…啊哈哈哈哈…%SELF_CALL\(TARGET\)%的肚子里…到底进去了什么东西呢…一定是…非常了不得的家伙吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7005',
        any: [/\t\tELSEIF TALENT:85 && CFLAG:102 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7006',
        any: [/「啊啊…该怎么办呢…难道、要生下主人的孩子了吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7007',
        any: [/%SAVESTR:TARGET%含情脉脉的摸着肚子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7009',
        any: [/\t\tELSEIF CFLAG:102 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7010',
        any: [/「啊啊…难道…可是………被其他的勇者弄怀孕什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7012',
        any: [/\t\tELSEIF CFLAG:102 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7013',
        any: [/「啊啊…难道…可是………被其他的勇者弄怀孕什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7015',
        any: [/\t\tELSEIF CFLAG:102 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7016',
        any: [/「不、不要…怀孕什么的…还没做好准备………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7018',
        any: [/\t\tELSEIF CFLAG:102 == 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7019',
        any: [/\t\t\tIF TALENT:136 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7020',
        any: [/「怀上了吗…狗狗大人的孩子，神明大人谢谢你～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7021',
        any: [/%SAVESTR:TARGET%含情脉脉的抚摸小腹，一副打从心底开心的模样/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7022',
        any: [/「虽然一直被内射了那么多，但没想到真的能怀上呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7023',
        any: [/^\t\t\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7024',
        any: [/「不会吧…被野狗…弄怀孕什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7025',
        any: [/^\t\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7027',
        any: [/\t\tELSEIF CFLAG:102 == 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7028',
        any: [/「难、难道…是狂王大人的孩子………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7030',
        any: [/^\t\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7031',
        any: [
          /「啊、啊嘞…难、难道…不会吧…要生下…魔物的孩子…了吗…该怎么办………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7032',
        any: [/^\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7033',
        any: [/\t\tCFLAG:271 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7035',
        any: [/^\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7037',
        any: [/\t\tIF TALENT:9 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7038',
        any: [
          /「啊哈～啊哈～…啊哈哈哈哈…%SELF_CALL\(TARGET\)%的肚子里…到底进去了什么东西呢…一定是…非常了不得的家伙吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7040',
        any: [/\t\tELSEIF TALENT:85 && CFLAG:102 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7041',
        any: [/「啊啊…能生下主人的孩子、真的好开心呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7042',
        any: [/%SAVESTR:TARGET%含情脉脉的摸着肚子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7044',
        any: [/\t\tELSEIF CFLAG:102 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7045',
        any: [/「啊啊…难道…可是………被其他的勇者弄怀孕什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7047',
        any: [/\t\tELSEIF CFLAG:102 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7048',
        any: [/「啊啊…难道…可是………被其他的勇者弄怀孕什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7050',
        any: [/\t\tELSEIF CFLAG:102 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7051',
        any: [/「不、不要…怀孕什么的…还没做好准备………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7053',
        any: [/\t\tELSEIF CFLAG:102 == 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7054',
        any: [/\t\t\tIF TALENT:136 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7055',
        any: [/「这么就又怀上了呢，狗狗大人真是精力充沛啊。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7056',
        any: [
          /%SAVESTR:TARGET%摸着肚子无奈的摇了摇头，脸上的笑容却怎么也停不下来/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7057',
        any: [/「乖乖长大吧，要长成一个健康的宝宝哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7058',
        any: [/^\t\t\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7059',
        any: [/「不会吧…被野狗…弄怀孕什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7060',
        any: [/^\t\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7062',
        any: [/\t\tELSEIF CFLAG:102 == 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7063',
        any: [/「难、难道…是狂王大人的孩子………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7065',
        any: [/^\t\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7066',
        any: [
          /「啊、啊嘞…难、难道…不会吧…要生下…魔物的孩子…了吗…该怎么办………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7067',
        any: [/^\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7068',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7069',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7075',
        any: [/IF TFLAG:13 == 12/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7076',
        any: [/\tIF CFLAG:272 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7078',
        any: [/\t\tIF TALENT:9 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7079',
        any: [
          /「呐呐…%SELF_CALL\(TARGET\)%肚子里的厉害家伙…会从哪里出来呢？那样一来%SELF_CALL\(TARGET\)%会坏掉吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7081',
        any: [/\t\tELSEIF TALENT:85 && CFLAG:102 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7082',
        any: [/「哈啊…哈啊…额呵呵…和父亲真像…真是个可爱的小宝宝…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7084',
        any: [/\t\tELSEIF CFLAG:102 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7085',
        any: [/「生下来了…生下来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7087',
        any: [/\t\tELSEIF CFLAG:102 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7088',
        any: [/「生下来了…生下来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7090',
        any: [/\t\tELSEIF CFLAG:102 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7091',
        any: [/「至少…要给这个孩子祝福………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7093',
        any: [/\t\tELSEIF CFLAG:102 == 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7094',
        any: [/\t\t\tIF TALENT:136 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7095',
        any: [
          /「平安的出生了，%SELF_CALL\(TARGET\)%和狗狗大人的孩子～♪能生下这么健康可爱的小狗崽好开心♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7096',
        any: [/温柔的亲吻着熟睡的小狗崽，%SAVESTR:TARGET%脸上洋溢着母爱的光辉/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7097',
        any: [/「会好好把你扶养长大的，而且…还想继续给你生弟弟妹妹…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7098',
        any: [/^\t\t\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7099',
        any: [/「这样的小狗…才不是%SELF_CALL\(TARGET\)%的孩子…呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7100',
        any: [/^\t\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7102',
        any: [/\t\tELSEIF CFLAG:102 == 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7103',
        any: [/「啊啊…生、生下来了…啊啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7105',
        any: [/^\t\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7106',
        any: [/「啊～…啊啊…真的…生下来了…啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7107',
        any: [/^\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7108',
        any: [/\t\tCFLAG:272 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7110',
        any: [/^\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7112',
        any: [/\t\tIF TALENT:9 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7113',
        any: [
          /「呐呐…%SELF_CALL\(TARGET\)%肚子里的厉害家伙…会从哪里出来呢？那样一来%SELF_CALL\(TARGET\)%会坏掉吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7115',
        any: [/\t\tELSEIF TALENT:85 && CFLAG:102 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7116',
        any: [/「哈啊…哈啊…额呵呵…和父亲真像…真是个可爱的小宝宝…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7118',
        any: [/\t\tELSEIF CFLAG:102 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7119',
        any: [/「生下来了…生下来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7121',
        any: [/\t\tELSEIF CFLAG:102 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7122',
        any: [/「生下来了…生下来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7124',
        any: [/\t\tELSEIF CFLAG:102 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7125',
        any: [/「至少…要给这个孩子祝福………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7127',
        any: [/\t\tELSEIF CFLAG:102 == 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7128',
        any: [/\t\t\tIF TALENT:136 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7129',
        any: [/「有了上次的经验，这次的生产更加顺利了♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7130',
        any: [
          /将刚产下的小狗崽抱在怀里，%SAVESTR:TARGET%熟练的撩起衣服给它喂奶/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7131',
        any: [/「真是可爱的宝宝，也带去给狗狗大人看看吧。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7132',
        any: [/^\t\t\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7133',
        any: [/「这样的小狗…才不是%SELF_CALL\(TARGET\)%的孩子…呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7134',
        any: [/^\t\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7136',
        any: [/\t\tELSEIF CFLAG:102 == 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7137',
        any: [/「啊啊…生、生下来了…啊啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7139',
        any: [/^\t\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7140',
        any: [/「啊啊啊…又、生下来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7141',
        any: [/^\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7142',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7143',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7148',
        any: [/IF TFLAG:13 == 13/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7150',
        any: [/\tIF TALENT:85 \|\| TALENT:76/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7152',
        any: [/\t\tIF TALENT:153/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7153',
        any: [/「嗯、马上就要生产了哦、请好好期待吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7154',
        any: [/%SAVESTR:TARGET%抚摸着即将临盆而变的圆鼓鼓的大肚子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7156',
        any: [/\t\tELSEIF TALENT:154/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7157',
        any: [/「快看…爸爸来了哦～？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7158',
        any: [/「来打个招呼吧～？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7159',
        any: [/%SAVESTR:TARGET%和孩子很亲密的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7160',
        any: [/^\t\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7161',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7162',
        any: [/\tCFLAG:273 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7163',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7168',
        any: [/IF TFLAG:13 == 14/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7170',
        any: [/\tIF TALENT:85 \|\| TALENT:76/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7171',
        any: [/「啊啊…那孩子要离巢了、有点寂寞呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7172',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7173',
        any: [/\tCFLAG:274 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7174',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7181',
        any: [/IF TFLAG:13 == 999/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7183',
        any: [/\tIF TALENT:85/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7184',
        any: [/^\s*PRINTFORM[WL]?\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7186',
        any: [/^\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7187',
        any: [/^\s*PRINTFORM[WL]?\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7188',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7189',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7194',
        any: [/IF TFLAG:13 == 998/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7196',
        any: [/\tIF TALENT:85/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7197',
        any: [/^\s*PRINTFORM[WL]?\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7199',
        any: [/^\tELSE$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7200',
        any: [/^\s*PRINTFORM[WL]?\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7201',
        any: [/^\tENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7202',
        any: [/^ENDIF$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '7209',
        any: [/^RETURN 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '87-483',
        any: [/^@EVENTTRAIN$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '489-595',
        any: [/^@K0_KOJO2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '601-668',
        any: [/^@EVENTEND$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '491',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '492',
        any: [/\tDRAWLINE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '493',
        any: [/「嘻嘻～…嘻～…请不要打扰我的祈祷…嘻～…嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '494-495',
        any: [/已经无法期待精神崩坏的%SAVESTR:TARGET%做出什么正常的反应了吧……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '498-499',
        any: [/ELSEIF MARK:3 == 3 && FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '500-501',
        any: [/「不可原谅…绝对…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '504-505',
        any: [
          /ELSEIF MARK:2 == 0 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '506',
        any: [/「没用的…%SELF_CALL\(TARGET\)%不会认输的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '508',
        any: [/\tIF TALENT:TARGET:317 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '509',
        any: [/（啊啊…无论发生什么…%SELF_CALL\(TARGET\)%都会与你同在……）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '510',
        any: [/%SAVESTR:TARGET%像是在向故郷的恋人祈祷的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '515-516',
        any: [
          /ELSEIF MARK:2 == 1 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '517',
        any: [/「…这样就可以了吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '519',
        any: [/\tIF TALENT:TARGET:317 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '520',
        any: [/「即使被做了这样的事%SELF_CALL\(TARGET\)%也不会认输的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '521',
        any: [/（拜托了…赐予%SELF_CALL\(TARGET\)%力量………）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '522',
        any: [/%SAVESTR:TARGET%像是在向故郷的恋人祈祷的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '527-528',
        any: [
          /ELSEIF MARK:2 == 2 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '529',
        any: [/「…这也是爱吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '531',
        any: [/\tIF TALENT:TARGET:317 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '532',
        any: [/（被这样的玷污…即便说是为了活下去…也没脸去见他了………）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '533',
        any: [/%SAVESTR:TARGET%是想起了故郷的恋人吧、现在快要哭出来的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '538-539',
        any: [
          /ELSEIF MARK:2 == 3 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '541',
        any: [/\tIF TALENT:TARGET:317 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '542',
        any: [/「请再…温柔一点…我不会抵抗的、所以…啊啊～………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '543',
        any: [/（啊啊…%SELF_CALL\(TARGET\)%…已经不行了…对不起……）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '544',
        any: [
          /%SAVESTR:TARGET%一边想着故郷的恋人一边抱住了%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '545-546',
        any: [/「请再…疼爱我吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '547',
        any: [/\t\tIF TALENT:TARGET:75 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '548',
        any: [
          /「身体…躁动的没办法了…求你了…我什么都会做的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '549',
        any: [/%SAVESTR:TARGET%的脑袋里已经只剩下做爱的念头了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '555-556',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '558',
        any: [/\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '559',
        any: [
          /「啊～…主人…请让我好好侍奉您那出色的大肉棒吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '560-561',
        any: [
          /「所以呢…请赐我精液～…我想要精液～…满满地淋过来吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '562-563',
        any: [/「啊～～…嗯～…嗯唔～…小穴好舒服啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '564',
        any: [/%SAVESTR:TARGET%毫不在意%NAME:MASTER%的到来沉溺于自慰之中。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '565-566',
        any: [
          /「肉棒…想要～…想被坚挺出色的大肉棒哧噗哧噗地插来插去啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '567-568',
        any: [
          /「快点～…快点来吧！想要主人想得受不了了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '569-570',
        any: [
          /「精液还不够…喉咙好渇～…忍不住了～…请再给我精液吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '575-576',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '578',
        any: [/\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '579',
        any: [/「哈哈、给了我好多的爱呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '580-581',
        any: [
          /「主人的爱…精液还不够…渇的没办法了………请给我精液～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '582-583',
        any: [/「请给我…更多的爱…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '584',
        any: [/\t\tIF TALENT:TARGET:75 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '585',
        any: [
          /「啊啊…请把主人的精液…满满地赐给%SELF_CALL\(TARGET\)%淫荡而爽的不行的小穴吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '586',
        any: [/淫靡的笑着的%SAVESTR:TARGET%、脑袋里已经被肉欲支配了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '588-589',
        any: [/「请给我、更多。干个爽吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '590-591',
        any: [
          /「真是的…一整天都在想着小穴的事情…%UNICODE\(0x2661\) \*1% 你可要负起責任哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '88-89',
        any: [/SIF FLAG:7 <= 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '90-91',
        any: [/SIF TALENT:160 != 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '96',
        any: [/IF CFLAG:201 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '97',
        any: [/\tDRAWLINE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '99',
        any: [/\tIF TALENT:TARGET:314 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '100',
        any: [/「请、请不要再做出那样的野蛮暴行了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '101',
        any: [/%SAVESTR:TARGET%直到现在还摆出高高在上的嘴脸说教着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '102',
        any: [/只是想想如何去玷污这个女精灵你就猛地硬了起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '103',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '105-106',
        any: [/「快、快点把%SELF_CALL\(TARGET\)%放出去、这也是为了你好。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '107',
        any: [/这个女狼人好像还在担心你的业报的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '108',
        any: [/看来你必须好好告诉她这些担心都是无意义的………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '109',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '111-112',
        any: [
          /「接受%SELF_CALL\(TARGET\)%的”吻”成为%SELF_CALL\(TARGET\)%的下仆吧。我会消除你的痛苦和烦恼的。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '113',
        any: [/这个吸血鬼毫不在意被完全囚禁的事实，还显得游刃有余的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '114',
        any: [/好像她对自己的”吻”很有自信呢。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '115',
        any: [/你涌起了一股把那份自信击溃得体无完肤的冲动………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '116',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '118-119',
        any: [/「你觉得%SELF_CALL\(TARGET\)%会变成你想要的那样吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '120',
        any: [/身为无头骑士的%SAVESTR:TARGET%还很游刃有余的样子。………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '121',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '123-124',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%才不会变成你想要的那样！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '125',
        any: [/「要是我认真起来的话，区区你这种程度的魔王………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '126',
        any: [/被捕获的龙族少女还是一副刚强不屈的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '127',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '129-130',
        any: [/「虽然你做出了那么多的愚行、但伟大的天神还是会原谅你的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '131',
        any: [/身为天使的%SAVESTR:TARGET%平静地这样说道。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '132',
        any: [/那就让你亲身体会一下，活在这地底下意味着什么吧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '133',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '135-136',
        any: [/%SAVESTR:TARGET%因为悲叹自己堕落成魔族而哭得眼睛都红肿了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '137',
        any: [/但是注意到你来了之后，还是强打精神瞪视着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '138',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…即便被变成了魔族…也絶対…絶対不会服从你的…！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '139',
        any: [
          /可是变成魔族的她、已经开始从本能上感觉到无法违抗身为魔族之王的你了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '140',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '142',
        any: [/\tCFLAG:370 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '144-145',
        any: [/「请、请不要做、奇、奇怪的事情…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '146',
        any: [/%SAVESTR:TARGET%被周围的气氛所震慑、失去了有生具来的开朗………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '147',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '149-150',
        any: [/「不要对别人做过分的事情～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '151',
        any: [
          /%SAVESTR:TARGET%毫不在意自己被抓住的事实仍在发挥着天生的正义感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '152',
        any: [/只是想想如何去玷污这样的女矮人你就猛地硬了起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '153',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '155-156',
        any: [/「你一定是有什么搞错了…为什么…要做出这样的事情…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '157',
        any: [/「%SELF_CALL\(TARGET\)%愿意代替其他人受过…所以你能不能…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '158',
        any: [/%SAVESTR:TARGET%似乎还相信你有慈悲心的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '159',
        any: [/只是想想如何去玷污这样的对象你就猛的硬了起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '160-161',
        any: [/\tCFLAG:201 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '166-167',
        any: [
          /被多次改造已经完全变成了魔族的%SAVESTR:TARGET%在房间的角落里抱着膝盖哭泣着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '168',
        any: [/发觉你来了之后、%SAVESTR:TARGET%顾不上擦眼泪就这样瞪视着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '169',
        any: [/「无论被怎样玷污…我也不会成为你的东西的…不会的………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '170',
        any: [
          /可是变成魔族的她、已经开始从本能上感觉到无法违抗身为魔族之王的你了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '172-173',
        any: [/\tCFLAG:370 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '177-178',
        any: [/ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '179',
        any: [/\t\tDRAWLINE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '180',
        any: [
          /一告诉她你已经看过那些水晶球的内容之后，%SAVESTR:TARGET%的脸色就就变了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '181',
        any: [
          /「魔、魔王大人…我、%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%对…您…您的事情可是连一秒钟也不敢忘记啊～/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '182',
        any: [
          /「无论什么样的惩罚我都愿意接受、即使您不原谅我也好…但、但是…求你让我继续待在您的身边吧…啊啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '183',
        any: [
          /从她的唯唯诺诺中你越发窥见到她在狂王那里接受了怎样的调教。%NAME:MASTER%的心中嫉妒的火焰在熊熊燃烧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '185',
        any: [/\t\tCFLAG:650 = 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '186-187',
        any: [/\t\tDRAWLINE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '188',
        any: [/「又被你抓住了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '189',
        any: [
          /「既被狂王玷污、又被你玷污………看来%SELF_CALL\(TARGET\)%的命运也就到此为止了…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '190',
        any: [/看起来%SAVESTR:TARGET%已经接受了自己的命运………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '192',
        any: [/\t\tCFLAG:650 = 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '199-200',
        any: [
          /ELSEIF CFLAG:201 < 2 && MARK:2 == 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '201',
        any: [/「能不能不要…再让我做这些事了…你觉得怎样呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '202',
        any: [/（不行…明明知道这样很奇怪…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '203-204',
        any: [/\tCFLAG:201 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '207-208',
        any: [
          /ELSEIF CFLAG:201 < 3 && MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '209',
        any: [/「这样如何呢…%SELF_CALL\(TARGET\)%…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '210',
        any: [/（明明应该很讨厌这样的事情的…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '211-212',
        any: [/\tCFLAG:201 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '215-216',
        any: [
          /ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '217',
        any: [/「好的…立刻…准备………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '218',
        any: [/（已经…无法抵抗了…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '219-220',
        any: [/\tCFLAG:201 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '223-224',
        any: [
          /ELSEIF CFLAG:201 < 5 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1 && TALENT:TARGET:314 != 9/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '225',
        any: [
          /「主、主人…%SELF_CALL\(TARGET\)%是…你的色情宠物…请随您的喜好…尽情使用%SELF_CALL\(TARGET\)%的身体吧…♪/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '226',
        any: [
          /这样说着的%SAVESTR:TARGET%四肢伏地、向着你撅起了屁股…那个隐秘的地方已经非常湿润了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '227',
        any: [/曾被称呼为圣女的%SAVESTR:TARGET%已经沉溺于肉欲里了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '228-229',
        any: [/\tCFLAG:201 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '231-232',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '234',
        any: [/\tIF CFLAG:370 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '235',
        any: [/「啊…魔王大人………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '236',
        any: [/转生成为魔族、被多次调教的%SAVESTR:TARGET%已经完全陥落了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '237',
        any: [
          /魔族的眼睛散发着淫荡的光泽、只是因为看到你、两腿之间的爱液就流了出来、好像害羞似地摩擦着双腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '239-240',
        any: [
          /「魔王大人、快点、用您那出色、持久、暴虐的大鸡鸡…将%SELF_CALL\(TARGET\)%最后残存的一丝清纯给玷污掉吧%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '242-243',
        any: [/看起来%SAVESTR:TARGET%已经无法压抑住兴奋之情了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '244',
        any: [/「从此以后也会一直侍奉魔王大人的…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '245',
        any: [
          /%SAVESTR:TARGET%一边抱着%NAME:MASTER%一边冲着耳根呼出了灼热的气息。那股气息里面包含着能让一般男人射精的魔力。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '246',
        any: [
          /「啊…请快点…命令作为魔王大人淫乱的仆人的%SAVESTR:TARGET%吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '247-248',
        any: [/\t\tCFLAG:201 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '250-251',
        any: [/「啊啊…魔王大人………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '252',
        any: [/转生成为魔族、被多次调教的%SAVESTR:TARGET%已经完全陥落了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '253',
        any: [
          /魔族的眼睛淫荡的湿润了、只是因为看见你两腿之间的爱液就已经流了出来。她害羞地摩擦着双腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '255-256',
        any: [
          /「请魔王大人用那漂亮而暴虐的鸡鸡…快点把%SELF_CALL\(TARGET\)%最后残留下来的清纯玷污吧%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '258-259',
        any: [/看起来%SAVESTR:TARGET%已经无法压抑住兴奋之情了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '260',
        any: [/「从此以后也会一直…侍奉魔王大人的…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '261',
        any: [
          /%SAVESTR:TARGET%一边抱着%NAME:MASTER%一边往%NAME:MASTER%的耳根呵着热气。那股气息里面包含着能让一般/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '262',
        any: [
          /「啊啊…请快点…对身为魔王大人淫乱下仆的%SAVESTR:TARGET%下命令吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '263-264',
        any: [/\t\tCFLAG:201 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '266-267',
        any: [
          /「啊啊啊…%UNICODE\(0x2661\) \*1% 变成这个身体之后就能清楚地感觉到…%SELF_CALL\(TARGET\)%一直以来被魔王大/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '268',
        any: [
          /%SAVESTR:TARGET%的一边淫靡地笑着一边舔了舔舌头。这是从以前的模样上无法想象到的下流动作。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '269',
        any: [
          /「虽然被改造挺恐怖的、不过、额呵呵、拜其所赐心情变得非常清爽了呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '270',
        any: [/%SAVESTR:TARGET%屁股着地坐到地板上将两条腿大大地张开。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '271',
        any: [
          /「从此以后…宣誓对魔王大人永远效忠…请随您的喜好来使用我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '272-273',
        any: [
          /「啊啊～真是的…已经忍不住了…请使用%SELF_CALL\(TARGET\)%的魔族小穴吧～%UNICODE\(0x2661\) \*1% 一定一定会/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '274-275',
        any: [/\t\tCFLAG:201 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '280-281',
        any: [
          /ELSEIF CFLAG:201 < 7 && TALENT:TARGET:85 == 1 && TALENT:TARGET:314 != 9/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '282',
        any: [/（那个人…怎么会…难道…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '283',
        any: [/%SAVESTR:TARGET%意识到了自己无时无刻不在想着你的事情……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '284',
        any: [/你的声音、你的样貌、你的手腕、你的身体…于是、她下定了决心………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '285',
        any: [/………………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '286',
        any: [/在調教房间里看到你的%SAVESTR:TARGET%用纯洁圣女般的表情微笑着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '287',
        any: [
          /「主人…%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%是你的所有物…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '288',
        any: [/%SAVESTR:TARGET%抱住了你，含情脉脉的用脸颊蹭着你的身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '289',
        any: [/「让我永远陪在您的身边…好不好…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '290-291',
        any: [/\tCFLAG:201 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '293-294',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '296',
        any: [/\tIF CFLAG:370 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '297',
        any: [/（啊…这份心情…无法抑制………！）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '298',
        any: [
          /%SAVESTR:TARGET%在经过多次的调教后陷入%NAME:MASTER%魔力的影响下而不可自拔、也就是说………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '299',
        any: [
          /「魔王大人…我爱你、一定是为了变成这样，%SELF_CALL\(TARGET\)%才来到了这里………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '300',
        any: [/即使那种心情是因为调教和肉体的变化才产生的也没办法吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '301',
        any: [
          /「啊啊～♪…%SELF_CALL\(TARGET\)%已经…光是待在魔王大人的身边就感到很满足了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '302-303',
        any: [/\t\tCFLAG:201 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '305-306',
        any: [/（啊啊…这份心情…无法抑制………！）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '307',
        any: [/%SAVESTR:TARGET%在经过多次的调教后、转生为了魔族、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '308',
        any: [/陷入%NAME:MASTER%魔力的影响下而不可自拔、也就是说………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '309',
        any: [
          /「魔王大人…我爱你、%SELF_CALL\(TARGET\)%的心和身体、都是属于你的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '310',
        any: [/即使那种心情是因为调教和肉体的变化才产生的也没办法吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '311',
        any: [
          /「啊啊～♪…%SELF_CALL\(TARGET\)%已经…光是待在魔王大人的身边就感到很满足了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '312-313',
        any: [/\t\tCFLAG:201 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '315-316',
        any: [/「这样的话…就可以一直和您在一起了！好开心…好开心…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '317',
        any: [/%SAVESTR:TARGET%因为变成魔族流出了喜悦的泪水。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '318',
        any: [
          /「能更强烈地感觉到您的存在了呢…%SELF_CALL\(TARGET\)%好像已经…变得有点奇怪了呢………%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '319',
        any: [/%SAVESTR:TARGET%激动地几乎要站不住了、抱住了%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '320-321',
        any: [/「请收下%SELF_CALL\(TARGET\)%的处女吧…就在今天好不好………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '322-323',
        any: [/「啊啊…说出如此下流的话真是非常抱歉…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '324-325',
        any: [/\t\tCFLAG:201 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '329-330',
        any: [/ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '331',
        any: [/%SAVESTR:TARGET%面向屋子的角落向神祈祷着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '332',
        any: [/祈祷完毕之后%SAVESTR:TARGET%把脸转向了你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '333',
        any: [
          /那个时候才发现、她所祈祷的对象只是放在屋子角落里代替便器的壶………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '334-335',
        any: [/\tCFLAG:201 = 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '339-340',
        any: [/ELSEIF ASSI < 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '349-351',
        any: [/ELSEIF NO:ASSI == 17/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '352',
        any: [/\tIF talent:ASSI:165/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '354',
        any: [/\t\tIF CFLAG:202 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '356',
        any: [/\t\t\tIF TALENT:TARGET:9 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '357',
        any: [/『…主人、这个人已经坏掉了哟』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '359-360',
        any: [
          /一看到%NAME:MASTER%所带来的%SAVESTR:ASSI%，%SAVESTR:TARGET%就舔了舔嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '361',
        any: [
          /「啊啊…看起来今天要三个人一起快活呢…%UNICODE\(0x2661\) \*1% 我想这一定会很美妙的」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '362',
        any: [
          /看起来%SAVESTR:TARGET%的脑袋里只有和本来应该作为拯救对象的少女，一起做爱的念头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '363',
        any: [
          /「那么过来吧…%UNICODE\(0x2661\) \*1% %SELF_CALL\(ASSI, CFLAG:ASSI:450\)%会好好疼爱你的…%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '364-365',
        any: [/\t\t\t\t\tSIF TALENT:ASSI:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '366',
        any: [
          /『哈哈～…这位姐姐干起来真是爽过头了啊…%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '367',
        any: [/\t\t\t\t\t\tRESETCOLOR/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '369-370',
        any: [
          /一看见%NAME:MASTER%所带来的%SAVESTR:ASSI%，%SAVESTR:TARGET%就露出了有点惊讶的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '371',
        any: [
          /「啊啦…在村子里听说过这个孩子呢…这样啊…果然还是变成了你的东西呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '372',
        any: [/%SAVESTR:TARGET%叹气之后、稍微有点生气的撅起了嘴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '373',
        any: [
          /「呵呵呵…就比一比你和%SELF_CALL\(TARGET\)%、谁更爱着主人吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '374-375',
        any: [/\t\t\t\t\tSIF TALENT:ASSI:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '376',
        any: [
          /『虽然很明显是一边倒的胜负…但还是想让你充分明白这一点、这位姐姐%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '377',
        any: [/\t\t\t\t\t\tRESETCOLOR/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '379-380',
        any: [
          /一看到%NAME:MASTER%所带来的%SAVESTR:ASSI%，%SAVESTR:TARGET%的脸就僵住了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '381',
        any: [/「啊啊…那个孩子是邻村的…你…对这样的小孩子都下手………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '382',
        any: [/%SAVESTR:ASSI%一边看着害怕着的%SAVESTR:TARGET%一边笑了笑。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '383',
        any: [/\t\t\t\tSETCOLOR 255,204,255/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '384',
        any: [/『勇者大人啊…和我一起玩一会儿吧…？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '385',
        any: [/\t\t\t\tRESETCOLOR/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '387-388',
        any: [/\t\t\tCFLAG:202 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '390-392',
        any: [/\t\tELSEIF CFLAG:202 == 1 && FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '393',
        any: [/『既然已经坏了…再弄坏一点也没问题吧★』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '395-396',
        any: [/「啊啦～…今天又是来见这位姐姐的吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '397',
        any: [/已经整理好着装的%SAVESTR:TARGET%对%SAVESTR:ASSI%笑了笑。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '398-399',
        any: [/\t\t\t\t\tSIF TALENT:ASSI:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '400',
        any: [/『才、才不是因为那个原因呢…只是想和姐姐比试一下而已！』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '401',
        any: [/\t\t\t\t\t\tRESETCOLOR/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '402',
        any: [
          /「额呵呵～…今天也要两个人一起好好侍奉亲爱的主人呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '403',
        any: [
          /%SAVESTR:TARGET%一边露出陶醉的表情，一边轻轻地用嘴唇蹭着%SAVESTR:ASSI%的脸颊………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '405-406',
        any: [/「哈哈～…今天也要三个人在一起快活呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '407',
        any: [/%SAVESTR:TARGET%目光如水、声音中难掩兴奋之情。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '408-409',
        any: [/\t\t\t\t\tSIF TALENT:ASSI:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '410',
        any: [
          /『嗯～…和主人一起把姐姐彻彻底底的侵犯吧…%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '411',
        any: [/\t\t\t\t\t\tRESETCOLOR/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '412',
        any: [
          /「啊…真棒呢…%SELF_CALL\(TARGET\)%…想和更多更多的人做爱呢…来吧…来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '413',
        any: [
          /%SAVESTR:TARGET%像狗一样四肢趴在地上并且把屁股高高撅起，而且还下流地左右摇晃着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '414',
        any: [/看起来因为期待着被%NAME:MASTER%和少女玩弄，下体开始湿润了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '416-417',
        any: [/「请、请不要再做这样的事情了…为、为了你好才这么说的…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '418',
        any: [
          /%SAVESTR:TARGET%回想起了被%SAVESTR:ASSI%玩弄的事情，身体颤抖不已。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '419',
        any: [/\t\t\t\tSETCOLOR 255,204,255/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '420',
        any: [
          /『只是和我一起玩玩而已嘛…再玩玩吧…勇者大人…%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '421',
        any: [/\t\t\t\tRESETCOLOR/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '422',
        any: [/前勇者手足无措的被少女推倒了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '427-428',
        any: [/\t\tCALL K0_KOJO2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '481-482',
        any: [/\tCALL K0_KOJO2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '602-603',
        any: [/SIF FLAG:7 <= 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '604-605',
        any: [/SIF TALENT:160 != 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '608-609',
        any: [/SIF BASE:0 <= 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '615',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '616',
        any: [/\tDRAWLINE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '617',
        any: [
          /「啊啊啊…啊啊…没法再祈祷下去了…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…啊、啊啊啊啊…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '618-619',
        any: [/%SAVESTR:TARGET%眼神空虚、喃喃的说着什么………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '621-622',
        any: [
          /ELSEIF MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '623-624',
        any: [/%SAVESTR:TARGET%对%NAME:MASTER%视若无睹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '627-628',
        any: [
          /ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '629-630',
        any: [/「你真是、无可药救了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '633-634',
        any: [
          /ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '635-636',
        any: [/「这就是…你的爱吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '639-640',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '641-642',
        any: [/「请…疼爱%SELF_CALL\(TARGET\)%吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '645-646',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '647-648',
        any: [
          /「再…再继续做嘛…请把小穴操到要发疯吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '650-651',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '652',
        any: [/「嗯～…啊…小穴～…最爽了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '653-654',
        any: [/%SAVESTR:TARGET%神情荡漾…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '657-658',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '659-660',
        any: [/「哈哈～、太好了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '662-663',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '664',
        any: [/「爱…好沉重呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '665-666',
        any: [/%SAVESTR:TARGET%红着脸神情陶醉的躺在床上………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '676-699',
        any: [/死斗场中は専用口上/, /SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '676-678',
        any: [/死斗场中は専用口上/, /^\tCALL COLOSSEUM_KOJO_0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '681-682',
        any: [/SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '684-685',
        any: [/SIF TEQUIP:45 && SELECTCOM != 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '687-688',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '690-691',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '693-695',
        any: [/兽奸PLAY中は口上を専用領域へ/, /^\tCALL DOG_KOJO_0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '698-699',
        any: [/SIF TEQUIP:90/],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '708',
        any: [/^IF SELECTCOM == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '708-752',
        any: [/^IF SELECTCOM == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '710-721',
        any: [/^\tIF CFLAG:301 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '712-719',
        any: [/^\t\tIF MARK:2 >= 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '713',
        any: [/PRINTFORMW 「啊啊…我会、老实的…所以…啊～啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '714',
        any: [/PRINTFORMW %SAVESTR:TARGET%乖乖的被你爱抚着身体/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '717',
        any: [/PRINTFORMW 「你的爱是虚假的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '718',
        any: [/PRINTFORMW %SAVESTR:TARGET%紧锁眉头、蜷缩着身体/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '720',
        any: [/^\t\tCFLAG:301 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '723-750',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '725-728',

        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '726',
        any: [/PRINTFORMW 「啊～…额呵呵…那个地方…再多摸摸…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '727',
        any: [/PRINTFORMW 只是稍微摸了摸%SAVESTR:TARGET%她就把持不住了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '728',
        any: [/^\t\t\tCFLAG:301 = 6$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '730-733',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '731',
        any: [/PRINTFORMW 「再来…请把我揉得乱七八糟吧……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '732',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像引诱%SAVESTR:PLAYER%的手似的扭着身体/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '733',
        any: [/^\t\t\tCFLAG:301 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '735-738',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '736',
        any: [/PRINTFORMW 「哈啊…哈啊…啊啊啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '737',
        any: [/PRINTFORMW %SAVESTR:TARGET%的嘴里呼着热气/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '738',
        any: [/^\t\t\tCFLAG:301 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '740-743',
        any: [
          /^\t\tELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '741',
        any: [/PRINTFORMW 「才不会…觉得舒服呢！　絶対不会！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '742',
        any: [/PRINTFORMW %SAVESTR:TARGET%扭动着身体忍耐着的样子/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '743',
        any: [/^\t\t\tCFLAG:301 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '745-748',
        any: [
          /^\t\tELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '746',
        any: [/PRINTFORMW 「…好恶心」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '747',
        any: [/PRINTFORMW %SAVESTR:TARGET%叹了口气/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '748',
        any: [/^\t\t\tCFLAG:301 = 2$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '757',
        any: [/^IF SELECTCOM == 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '757-794',
        any: [/^IF SELECTCOM == 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '759-769',
        any: [/^\tIF CFLAG:302 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '761-767',
        any: [/^\t\tIF TALENT:TARGET:0 == 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '762',
        any: [/PRINTFORMW 「你、你在舔哪里啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '763',
        any: [/PRINTFORMW %SAVESTR:TARGET%的私处处有着处女的味道/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '766',
        any: [/PRINTFORMW 「请住手吧…不要舔那个地方！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '768',
        any: [/^\t\tCFLAG:302 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '771-792',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '773-776',

        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '774',
        any: [/PRINTFORMW 「再来～…再舔我那里吧…喝下去也行…啊啊～～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '775',
        any: [/PRINTFORMW 蜜汁从%SAVESTR:TARGET%的私处处不断涌了出来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '776',
        any: [/^\t\t\tCFLAG:302 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '778-781',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '779',
        any: [/PRINTFORMW 「哈哈～…好吃吗？　这个…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '780',
        any: [/PRINTFORMW %SAVESTR:TARGET%腼腆的笑着发出快乐的声音/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '781',
        any: [/^\t\t\tCFLAG:302 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '783-786',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '784',
        any: [/PRINTFORMW 「呜唔呜唔…呜呜～！　不要～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '785',
        any: [/PRINTFORMW %SAVESTR:TARGET%嘴上说着不要但还是老实地让你舔着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '786',
        any: [/^\t\t\tCFLAG:302 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '788-790',
        any: [/^\t\tELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '789',
        any: [/PRINTFORMW 「这么脏的地方也…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '790',
        any: [/^\t\t\tCFLAG:302 = 2$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '799',
        any: [/^IF SELECTCOM == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '799-856',
        any: [/^IF SELECTCOM == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '801-804',
        any: [/^\tIF CFLAG:303 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '802',
        any: [/PRINTFORMW 「讨厌！　难、难以置信！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '803',
        any: [/^\t\tCFLAG:TARGET:303 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '806-854',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '807',
        any: [/P = PALAM:3 \+ UP:3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '809-815',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '810',
        any: [/PRINTFORMW 「啊呜～…好棒～！再来…往深处挖！往深处抠！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '812-813',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '813',

        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '814',
        any: [/PRINTFORMW %SAVESTR:TARGET%每当被抠弄肛门就会发出娇喘/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '815',
        any: [/^\t\t\tCFLAG:303 = 7$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '817-822',
        any: [
          /^\t\tELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '818',
        any: [/PRINTFORMW 「啊～～…明明还不够湿…不过这样也好棒/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '820-821',
        any: [/虽然还不够润滑但也能享受起你的爱抚/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '821',
        any: [/虽然还不够润滑但也能享受起你的爱抚/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '822',
        any: [/^\t\t\tCFLAG:303 = 6$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '824-830',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '825',
        any: [/PRINTFORMW 「再、再多疼爱一下屁股眼吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '827-828',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '828',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '829',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每当被抠弄肛门就会发出不成体统的呻吟/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '830',
        any: [/^\t\t\tCFLAG:303 = 5$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '832-837',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '833',
        any: [/PRINTFORMW 「突、突然做什么呢！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '835-836',
        any: [/虽然还不够润滑但也能享受起你的爱抚/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '836',
        any: [/虽然还不够润滑但也能享受起你的爱抚/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '837',
        any: [/^\t\t\tCFLAG:303 = 4$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '839-845',
        any: [
          /^\t\tELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '840',
        any: [
          /PRINTFORMW 「难以置信…%SELF_CALL\(TARGET\)%…的屁股…啊～…啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '842-843',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '843',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的肛门已经被完全開発好了、张得大大的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '844',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门的快感而神情迷醉/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '845',
        any: [/^\t\t\tCFLAG:303 = 3$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '847-852',
        any: [/^\t\tELSEIF CFLAG:223 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '848',
        any: [/PRINTFORMW 「不要啊…够了、快住手～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '850-851',
        any: [/PRINTFORMW %SAVESTR:TARGET%鈍感的肛门被刺激得红肿了起来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '851',

        any: [/PRINTFORMW %SAVESTR:TARGET%鈍感的肛门被刺激得红肿了起来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '852',
        any: [/^\t\t\tCFLAG:303 = 2$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '861',
        any: [/^IF SELECTCOM == 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '861-968',
        any: [/^IF SELECTCOM == 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '863-873',
        any: [/^\tIF CFLAG:304 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '865-871',
        any: [/^\t\tIF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '866',
        any: [/PRINTFORMW 「啊啊…请多多的…欣赏吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '869',
        any: [/PRINTFORMW 「你是…悪魔」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '870',
        any: [/PRINTFORMW %SAVESTR:TARGET%一副要哭出来的样子继续自慰着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '872',
        any: [/^\t\tCFLAG:TARGET:304 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '875-966',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '877-881',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '878',
        any: [/淫乱处女膜夺走吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '879',
        any: [/把%SELF_CALL\(TARGET\)%的小穴捣进去吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '880',
        any: [/再也找不到一丝被称作聖女时候的清纯痕迹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '881',
        any: [/^\t\t\tCFLAG:304 = 9$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '883-902',
        any: [
          /^\t\tELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '885-894',
        any: [/PRINTFORM 「看吧～%UNICODE\(0x2661\) \*1%　噗咻噗咻勃起的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '887',
        any: [/PRINTFORM 「看吧～%UNICODE\(0x2661\) \*1%　噗咻噗咻勃起的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '889',
        any: [/^\t\t\t\t\tPRINT 鸡鸡～$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '891',
        any: [/^\t\t\t\t\tPRINT 假鸡鸡～$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '893',
        any: [/PRINTFORMW %UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '894',
        any: [/请大家一起看我做舒服的事吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '896',
        any: [/飞起来了～飞起来了～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '898',
        any: [/平时一个人是怎么做的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '900',
        any: [/搅着搅着小穴里的淫水就止不住了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '902',
        any: [/^\t\t\tCFLAG:304 = 8$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '904-911',
        any: [
          /^\t\tELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '907',
        any: [/卖力自慰后请赏我大肉棒吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '909',
        any: [/小穴玩得停不下来了～…对不起～～！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '911',
        any: [/^\t\t\tCFLAG:304 = 7$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '913-916',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '914',
        any: [/我在玩弄主人专用的专属小穴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '915',
        any: [/感觉处女膜也在一颤一颤的呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '916',
        any: [/^\t\t\tCFLAG:304 = 6$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '918-937',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '920-929',
        any: [/PRINTFORM 「看见了吗？～♪　噗咻噗咻勃起的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '922',
        any: [/PRINTFORM 「看见了吗？～♪　噗咻噗咻勃起的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '924',
        any: [/^\t\t\t\t\tPRINT 鸡鸡……$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '926',
        any: [/^\t\t\t\t\tPRINT 假鸡鸡$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '928',
        any: [/PRINTFORMW ♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '929',
        any: [/只有有爱的话，在大家面前也不觉得尴尬了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '931',
        any: [/PRINTFORMW 「好、爽～！　啊哈哈…哈哈…好爽～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '933',
        any: [/看看自慰地发狂的%SELF_CALL\(TARGET\)%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '935',
        any: [/这样…完全不够呢…还要…你的…啊啊～♪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '937',
        any: [/^\t\t\tCFLAG:304 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '939-946',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '942',
        any: [/被看着…虽然很害羞、不过太舒服了～！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '944',
        any: [/PRINTFORMW 「哈啊…哈啊…啊啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '946',
        any: [/^\t\t\tCFLAG:304 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '948-955',
        any: [
          /^\t\tELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '951',
        any: [/PRINTFORMW 「如果这是你希望的话…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '953',
        any: [/PRINTFORMW 「就照你说的做吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '955',
        any: [/^\t\t\tCFLAG:304 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '957-964',
        any: [/^\t\tELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '960',
        any: [/PRINTFORMW 「好难为情…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '962',
        any: [/PRINTFORMW 「真讨厌…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '964',
        any: [/^\t\t\tCFLAG:304 = 2$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '973',
        any: [/^IF SELECTCOM == 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '973-1060',
        any: [/^IF SELECTCOM == 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '975-1001',
        any: [/^\tIF CFLAG:306 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '977-987',
        any: [
          /^\t\tIF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '979-986',
        any: [/^\t\t\tIF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '980',
        any: [/请你吮吸并品尝母乳吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '983',
        any: [/PRINTFORMW 「啊啊啊～…乳房被吸了…不要啊～…呜啊…啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '986',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的乳头被吸吮着、被刺激的红肿起来/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '990-997',
        any: [/PRINTFORMW 「请你随心所欲的揉吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '991',
        any: [/PRINTFORMW 「请你随心所欲的揉吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '994',
        any: [/PRINTFORMW 「讨厌、変態！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '997',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鈍感的乳头被吸吮着、被刺激的红肿起来/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1000',
        any: [/^\t\tCFLAG:TARGET:306 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1003-1058',
        any: [
          /^\t\tIF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1005-1026',
        any: [
          /^\t\tIF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1007-1010',
        any: [
          /^\t\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1008',
        any: [/乳房一被吸…就好像要去了似的呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1009',
        any: [/一颤一颤的痙攣着往%SAVESTR:PLAYER%的嘴里喷出母乳/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1010',
        any: [/^\t\t\t\tCFLAG:306 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1012-1015',
        any: [
          /^\t\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1013',
        any: [/吸%SELF_CALL\(TARGET\)%的奶来恢复精神吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1014',
        any: [/像慈母般微笑着看着吮吸着乳头的%SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1015',
        any: [/^\t\t\t\tCFLAG:306 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1017-1020',
        any: [
          /^\t\t\tELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1018',
        any: [/这可是小宝宝吸的…东西啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1019',
        any: [/每当乳头溢出母乳就会沉浸在愉悦之中/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1020',
        any: [/^\t\t\t\tCFLAG:306 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1022-1025',
        any: [/^\t\t\tELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1023',
        any: [/乳房…不要吸乳房啊～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1024',
        any: [/渐渐沉溺于母乳流出所带来的炽熱快感中/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1025',
        any: [/^\t\t\t\tCFLAG:306 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1029-1034',
        any: [
          /^\t\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1030',
        any: [/虽然很痛但也被弄得好舒服呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1033',
        any: [/鈍感的乳头已被完全開発、被含进嘴里舔得完全勃起了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1034',
        any: [/^\t\t\t\tCFLAG:306 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1036-1041',
        any: [
          /^\t\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1037',
        any: [/PRINTFORMW 「手好温暖…啊啊…好舒服啊…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1040',
        any: [/鈍感的乳头已被完全開発、鼓鼓胀胀地完全勃起了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1041',
        any: [/^\t\t\t\tCFLAG:306 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1043-1048',
        any: [
          /^\t\t\tELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1044',
        any: [/PRINTFORMW 「好有感觉…真舒服…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1047',
        any: [/鈍感的乳头已被完全開発、被刺激得勃了起来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1048',
        any: [/^\t\t\t\tCFLAG:306 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1050-1055',
        any: [/^\t\t\tELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1051',
        any: [/PRINTFORMW 「虽然被这样揉很疼…咕呜～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1054',
        any: [/鈍感的乳头被刺激得红肿起来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1055',
        any: [/^\t\t\t\tCFLAG:306 = 2$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1065',
        any: [/^IF SELECTCOM == 6$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1065-1148',
        any: [/^IF SELECTCOM == 6$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1067-1097',
        any: [/^\tIF CFLAG:307 == 0 && TFLAG:13$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1069-1076',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1070',
        any: [/嘞噗～啾～啾～～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1071',
        any: [/在初吻时就用难以想象的热情/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1072',
        any: [/再多和我…亲吻一会儿吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1075',
        any: [/已经没有故郷恋人的存在了吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1078-1085',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1079',
        any: [/%SELF_CALL\(TARGET\)%的初吻/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1080',
        any: [/忸忸怩怩很害羞的样子/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1081',
        any: [/你要负起…责任哦/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1084',
        any: [/这样微笑着的%SAVESTR:TARGET%脑子里已经没有故郷恋人/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1087-1094',
        any: [/%SELF_CALL\(TARGET\)%的第一次/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1088',
        any: [/%SELF_CALL\(TARGET\)%的第一次/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1089',
        any: [/饶有兴致的品味着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1092',
        any: [/对不起…对不起/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1093',
        any: [/想起故郷的恋人流下了眼泪/],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1099-1124',
        any: [/^\tELSEIF CFLAG:307 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1101-1106',
        any: [/^\t\tIF TALENT:TARGET:76 == 1$/m, /我还想再接吻/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1102',
        any: [/我还想再接吻/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1105',
        any: [/痴痴笑着的%SAVESTR:TARGET%脑子里已经没有故郷恋人/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1108-1113',
        any: [/^\t\tELSEIF TALENT:TARGET:85 == 1$/m, /可以再来一次吗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1109',
        any: [/可以再来一次吗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1112',
        any: [/这样微笑着的%SAVESTR:TARGET%脑子里已经没有故郷恋人/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1115-1121',
        any: [/好、好恶毒/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1116',
        any: [/好、好恶毒/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1119',
        any: [/对不起…对不起/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1120',
        any: [/想起故郷的恋人流下了眼泪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1126-1146',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1128-1130',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1129',
        any: [/请再多吻我吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1132-1135',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1133',
        any: [/我只是说喜欢接吻罢了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1134',
        any: [/不断地接吻着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1137-1139',
        any: [
          /^\t\tELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1138',
        any: [/这、这样就可以了吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1141-1144',
        any: [/^\t\tELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1142',
        any: [/PRINTFORMW 「嗯～…咕～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1143',
        any: [/把唇移开、不好意思的躲闪着视线/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1153',
        any: [/^IF SELECTCOM == 7$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1153-1189',
        any: [/^IF SELECTCOM == 7$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1155-1167',
        any: [/^\tIF CFLAG:308 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1157-1159',
        any: [/淫乱小穴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1158',
        any: [/淫乱小穴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1160-1162',
        any: [/如果是主人的命令的话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1161',
        any: [/如果是主人的命令的话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1163-1165',
        any: [/这、这样…是不对的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1164',
        any: [/这、这样…是不对的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1169-1187',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1171-1173',
        any: [/^\t\t\tCFLAG:306 = 5$/m, /迫不及待地想被小鸡鸡插来插去了呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1172',
        any: [/迫不及待地想被小鸡鸡插来插去了呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1175-1177',
        any: [/SELF_CALL_FIRST\(TARGET\)/, /^\t\t\tCFLAG:306 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1176',
        any: [/不要老是盯着这里看嘛/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1179-1181',
        any: [
          /^\t\tELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1180',
        any: [/小穴被看着好有感觉啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1183-1185',
        any: [/^\t\tELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1184',
        any: [/不要看那种地方/],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1194',
        any: [/^IF SELECTCOM == 8$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1194-1248',
        any: [/^IF SELECTCOM == 8$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1196-1214',
        any: [/^\tIF CFLAG:TARGET:309 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1198-1199',
        any: [/尽情蹂躏%SELF_CALL\(TARGET\)%的阴道吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1199',
        any: [/尽情蹂躏%SELF_CALL\(TARGET\)%的阴道吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1201-1203',
        any: [/^\t\tELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1202',
        any: [/请再往里面插/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1203',
        any: [/是的、没问题/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1205-1209',
        any: [/住手…住手啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1206',
        any: [/住手…住手啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1208-1209',
        any: [/SIF TALENT:TARGET:103/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1209',
        any: [/私处不太容易有感觉/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1211',
        any: [/^\t\tCFLAG:TARGET:309 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1214-1246',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1216-1221',
        any: [/把小穴弄得湿漉漉的吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1217',
        any: [/把小穴弄得湿漉漉的吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1219-1220',
        any: [/SIF ABL:2 >= 3 && TALENT:TARGET:103/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1220',
        any: [/贪婪的吞下了%SAVESTR:PLAYER%所有的爱撫/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1221',
        any: [/^\t\t\tCFLAG:309 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1223-1229',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1224',
        any: [/主人的手指…好温柔/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1225',
        any: [/你、你欺负人啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1227-1228',
        any: [/完全接受了%SAVESTR:PLAYER%的爱撫/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1228',
        any: [/完全接受了%SAVESTR:PLAYER%的爱撫/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1229',
        any: [/^\t\t\tCFLAG:309 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1231-1236',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1232',
        any: [/我不会反抗的、所以…再温柔一点/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1234-1235',
        any: [/不成体统的挺着腰/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1235',
        any: [/不成体统的挺着腰/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1236',
        any: [/^\t\t\tCFLAG:309 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1238-1243',
        any: [/^\t\tELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1239',
        any: [/即使被做了这样的事%SELF_CALL\(TARGET\)%也/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1241-1242',
        any: [/每次在里面摩擦/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1242',
        any: [/每次在里面摩擦/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1243',
        any: [/^\t\t\tCFLAG:309 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1252',
        any: [/^IF SELECTCOM == 9$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1252-1310',
        any: [/^IF SELECTCOM == 9$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1254-1276',
        any: [/^\tIF CFLAG:310 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1256-1260',
        any: [/还要…再舐舐吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1257',
        any: [/还要…再舐舐吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1259-1260',
        any: [/SIF ABL:3 >= 3 && TALENT:TARGET:105/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1260',
        any: [/发出了非常带感的声音/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1262-1266',
        any: [/那里很脏啊…太羞人了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1263',
        any: [/那里很脏啊…太羞人了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1265-1266',
        any: [/弄得娇喘起来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1266',
        any: [/弄得娇喘起来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1268-1272',
        any: [/不、不要啊～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1269',
        any: [/不、不要啊～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1271-1272',
        any: [/发出了高亢的悲鳴声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1272',
        any: [/发出了高亢的悲鳴声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1274',
        any: [/^\t\tCFLAG:TARGET:310 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1277-1308',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1279-1284',
        any: [/再用舌头舔我吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1280',
        any: [/再用舌头舔我吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1282-1283',
        any: [/SIF ABL:3 >= 3 && TALENT:TARGET:105/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1283',
        any: [/发出了非常带感的声音/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1284',
        any: [/^\t\t\tCFLAG:310 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1286-1291',
        any: [/再温柔一点…舐的话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1287',
        any: [/再温柔一点…舐的话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1289-1290',
        any: [/弄得娇喘出声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1290',
        any: [/弄得娇喘出声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1291',
        any: [/^\t\t\tCFLAG:310 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1293-1298',
        any: [/请再…舔我吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1294',
        any: [/请再…舔我吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1296-1297',
        any: [/搅得发出了快乐的声音/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1297',
        any: [/搅得发出了快乐的声音/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1298',
        any: [/^\t\t\tCFLAG:310 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1300-1305',
        any: [/讨厌…明明很脏/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1301',
        any: [/讨厌…明明很脏/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1303-1304',
        any: [/发出了悲鳴声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1304',
        any: [/发出了悲鳴声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1305',
        any: [/^\t\t\tCFLAG:310 = 2$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1314',
        any: [/^IF SELECTCOM == 10$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1314-1352',
        any: [/^IF SELECTCOM == 10$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1316-1328',
        any: [/^\tIF CFLAG:TARGET:311 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1318-1319',
        any: [/这样的震动太美妙了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1319',
        any: [/这样的震动太美妙了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1321-1322',
        any: [/^\t\tELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1322',
        any: [/请尽情使用吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1324-1325',
        any: [/这到底是什么东西/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1325',
        any: [/这到底是什么东西/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1327',
        any: [/^\t\tCFLAG:TARGET:311 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1330-1349',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1332-1334',
        any: [/我还要更多、更多/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1333',
        any: [/我还要更多、更多/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1334',
        any: [/扭着腰身因为愉悦而颤抖不已/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1335',
        any: [/^\t\t\tCFLAG:311 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1337-1340',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1338',
        any: [/这东西…真厉害啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1339',
        any: [/忍耐陰核的震动/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1340',
        any: [/^\t\t\tCFLAG:311 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1342-1344',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1343',
        any: [/感觉变的好舒服啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1344',
        any: [/^\t\t\tCFLAG:311 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1346-1348',
        any: [/^\t\tELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1347',
        any: [/再、再这样下去的话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1348',
        any: [/^\t\t\tCFLAG:311 = 2$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1358',
        any: [/^IF SELECTCOM == 11 && TEQUIP:11$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1358-1433',
        any: [/^IF SELECTCOM == 11 && TEQUIP:11$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1360-1400',
        any: [/^\tIF CFLAG:TARGET:312 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1362-1376',
        any: [/^\t\tIF TALENT:0 == 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1364-1367',
        any: [/渐渐地钻进…小穴里面去了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1365',
        any: [/渐渐地钻进…小穴里面去了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1366',
        any: [/主人的小鸡鸡…明明一直在等待着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1367',
        any: [/有点悲伤地忍耐着破瓜的疼痛/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1369-1372',
        any: [/一点也不痛/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1370',
        any: [/一点也不痛/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1371',
        any: [/咬牙忍耐着破瓜的痛楚/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1372',
        any: [/下次…想要…………主人的…东西/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1374-1375',
        any: [/好狠心…好狠心啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1375',
        any: [/好狠心…好狠心啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1380-1384',
        any: [/这样被张开…好厉害啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1381',
        any: [/这样被张开…好厉害啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1383-1384',
        any: [/把壶虫贪婪的连根吞了进去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1384',
        any: [/把壶虫贪婪的连根吞了进去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1386-1390',
        any: [/这东西在%SELF_CALL\(TARGET\)%的阴道里/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1387',
        any: [/这东西在%SELF_CALL\(TARGET\)%的阴道里/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1389-1390',
        any: [/把壶虫连根吞了进去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1390',
        any: [/把壶虫连根吞了进去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1392-1396',
        any: [/在%SELF_CALL\(TARGET\)%的里面蠕动着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1393',
        any: [/在%SELF_CALL\(TARGET\)%的里面蠕动着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1395-1396',
        any: [/被壶虫连根插入的%SAVESTR:TARGET%好像很痛苦似的呻吟着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1396',
        any: [/被壶虫连根插入的%SAVESTR:TARGET%好像很痛苦似的呻吟着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1399',
        any: [/^\t\tCFLAG:312 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1402-1433',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1404-1409',
        any: [/明明是虫子而已/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1405',
        any: [/明明是虫子而已/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1407-1408',
        any: [/SIF ABL:2 >= 3 && TALENT:TARGET:103/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1408',
        any: [/把壶虫贪婪的连根吞了进去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1409',
        any: [/^\t\t\tCFLAG:312 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1411-1416',
        any: [/弄得更加一塌糊涂吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1412',
        any: [/弄得更加一塌糊涂吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1414-1415',
        any: [/好像很愉快似的轻松把壶虫连根吞了进去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1415',
        any: [/好像很愉快似的轻松把壶虫连根吞了进去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1416',
        any: [/^\t\t\tCFLAG:312 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1418-1423',
        any: [/腰…都舒服的動不了了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1419',
        any: [/腰…都舒服的動不了了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1421-1422',
        any: [/SIF TALENT:TARGET:103/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1422',
        any: [/把壶虫连根吞了进去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1423',
        any: [/^\t\t\tCFLAG:312 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1425-1430',
        any: [/咕呜～…啊～…咿～～…不、不要～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1426',
        any: [/咕呜～…啊～…咿～～…不、不要～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1428-1429',
        any: [/被壶虫连根插入的%SAVESTR:TARGET%好像很痛苦似的呻吟着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1429',
        any: [/被壶虫连根插入的%SAVESTR:TARGET%好像很痛苦似的呻吟着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1430',
        any: [/^\t\t\tCFLAG:312 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1435',
        any: [/^ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1435-1450',
        any: [/^ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1437-1439',
        any: [
          /^\tIF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1438',
        any: [/下次…要把什么插进来呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1439',
        any: [/^\t\tCFLAG:372 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1441-1443',
        any: [/下次想要…主人的东西/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1442',
        any: [/下次想要…主人的东西/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1443',
        any: [/^\t\tCFLAG:372 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1445-1447',
        any: [/大张的小穴空出来了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1446',
        any: [/大张的小穴空出来了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1447',
        any: [/^\t\tCFLAG:372 = 1$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1455',
        any: [/^IF SELECTCOM == 12$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1455-1499',
        any: [/^IF SELECTCOM == 12$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1457-1475',
        any: [/^\tIF CFLAG:313 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1459-1465',
        any: [/讨、讨厌！那里好痒啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1460',
        any: [/讨、讨厌！那里好痒啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1461',
        any: [/每当振动杖按在%SAVESTR:TARGET%的两腿之间就会带来极度刺激的快感/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1462',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1463',
        any: [/PRINTFORMW ……$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1464',
        any: [/30分後/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1465',
        any: [/不要…再…继…继续、下…去/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1467-1469',
        any: [/魔族的道具里还有这样的奇怪玩意儿吗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1468',
        any: [/魔族的道具里还有这样的奇怪玩意儿吗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1469',
        any: [/好厉害的震动/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1471-1472',
        any: [/只不过是有点痒罢了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1472',
        any: [/只不过是有点痒罢了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1474',
        any: [/^\t\tCFLAG:313 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1476-1498',
        any: [
          /^\t\tIF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1479-1482',
        any: [/请用这个色情的杖来欺负/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1480',
        any: [/请用这个色情的杖来欺负/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1481',
        any: [/麻麻的好厉害啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1482',
        any: [/^\t\t\tCFLAG:313 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1484-1487',
        any: [/请…请继续…主人/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1485',
        any: [/请…请继续…主人/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1486',
        any: [/好…好舒服…好…舒…服/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1487',
        any: [/^\t\t\tCFLAG:313 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1489-1491',
        any: [/明明被用这种东西玩弄/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1490',
        any: [/明明被用这种东西玩弄/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1491',
        any: [/^\t\t\tCFLAG:313 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1493-1495',
        any: [/这样…好有感觉、不要…不要啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1494',
        any: [/这样…好有感觉、不要…不要啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1495',
        any: [/^\t\t\tCFLAG:313 = 2$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1505',
        any: [/^IF SELECTCOM == 13 && TEQUIP:13$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1505-1588',
        any: [/^IF SELECTCOM == 13 && TEQUIP:13$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1507-1529',
        any: [/^\tIF CFLAG:TARGET:314 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1509-1514',
        any: [/连尻穴里都被虫子钻进去了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1510',
        any: [/连尻穴里都被虫子钻进去了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1511',
        any: [/曾被称作聖女的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1513-1514',
        any: [/于是%SAVESTR:TARGET%鈍感的肛门被快楽所開発/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1514',
        any: [/于是%SAVESTR:TARGET%鈍感的肛门被快楽所開発/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1516-1520',
        any: [/这种程度完全能够承受的下来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1517',
        any: [/这种程度完全能够承受的下来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1519-1520',
        any: [/由于肛门虫的刺激而娇喘出声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1520',
        any: [/由于肛门虫的刺激而娇喘出声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1522-1526',
        any: [/那里不能进去～！不能进去啊～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1523',
        any: [/那里不能进去～！不能进去啊～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1525-1526',
        any: [/%SAVESTR:TARGET%发出了悲鳴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1526',
        any: [/%SAVESTR:TARGET%发出了悲鳴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1528',
        any: [/^\t\tCFLAG:TARGET:314 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1530-1588',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1533-1544',
        any: [/这么粗的蠕虫要插进%SELF_CALL\(TARGET\)%屁股眼里去了哦/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1535-1537',
        any: [/妖艳的那期蠕虫、舔了舔嘴唇/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1536',
        any: [/这么粗的蠕虫要插进%SELF_CALL\(TARGET\)%屁股眼里去了哦/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1537',
        any: [/妖艳的那期蠕虫、舔了舔嘴唇/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1539',
        any: [/屁股眼好舒服～！再往里钻吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1542-1543',
        any: [
          /鈍感的肛门被調教出了快感、由于肛门虫的刺激而发出了很带感的呻吟声/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1543',
        any: [
          /鈍感的肛门被調教出了快感、由于肛门虫的刺激而发出了很带感的呻吟声/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1544',
        any: [/^\t\t\tCFLAG:314 = 6$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1546-1551',
        any: [/虫子…在…里面/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1547',
        any: [/虫子…在…里面/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1549-1550',
        any: [/好像很开心的晃着屁股作为回应/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1550',
        any: [/好像很开心的晃着屁股作为回应/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1551',
        any: [/^\t\t\tCFLAG:314 = 6$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1553-1564',
        any: [/見请看吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1555-1557',
        any: [/抱起一抖一抖的扭动着的蠕虫/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1556',
        any: [/見请看吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1557',
        any: [/抱起一抖一抖的扭动着的蠕虫/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1559',
        any: [/屁股眼…感觉…好棒呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1562-1563',
        any: [/由于肛门虫的刺激娇喘出声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1563',
        any: [/由于肛门虫的刺激娇喘出声/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1564',
        any: [/^\t\t\tCFLAG:314 = 5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1566-1571',
        any: [/屁、屁股…好奇怪…变的好奇怪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1567',
        any: [/屁、屁股…好奇怪…变的好奇怪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1569-1570',
        any: [/就皱起眉头发出了好像很痛苦的呻吟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1570',
        any: [/就皱起眉头发出了好像很痛苦的呻吟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1571',
        any: [/^\t\t\tCFLAG:314 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1573-1578',
        any: [/屁股眼爽的不行了…明明不能这样的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1574',
        any: [/屁股眼爽的不行了…明明不能这样的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1576-1577',
        any: [/被開発而觉醒了快感/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1577',
        any: [/被開発而觉醒了快感/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1578',
        any: [/^\t\t\tCFLAG:314 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1580-1585',
        any: [/咕呜～…好难受…好难受啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1581',
        any: [/咕呜～…好难受…好难受啊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1583-1584',
        any: [/%SAVESTR:TARGET%就发出了悲鳴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1584',
        any: [/%SAVESTR:TARGET%就发出了悲鳴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1585',
        any: [/^\t\t\tCFLAG:314 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1590',
        any: [/^ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1590-1609',
        any: [/^ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1592-1594',
        any: [/要是能一整天都能被抽插着就好了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1593',
        any: [/要是能一整天都能被抽插着就好了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1594',
        any: [/^\t\tCFLAG:374 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1596-1598',
        any: [/总觉得屁股眼感到寂寞了呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1597',
        any: [/总觉得屁股眼感到寂寞了呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1598',
        any: [/^\t\tCFLAG:374 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1600-1602',
        any: [/屁股眼…还意犹未尽/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1601',
        any: [/屁股眼…还意犹未尽/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1602',
        any: [/^\t\tCFLAG:374 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1604-1606',
        any: [/「哈啊…哈啊…哈啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1605',
        any: [/「哈啊…哈啊…哈啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1606',
        any: [/^\t\tCFLAG:374 = 1$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1615',
        any: [/^IF SELECTCOM == 14 && TEQUIP:14$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1615-1646',
        any: [/^IF SELECTCOM == 14 && TEQUIP:14$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1617-1629',
        any: [/^\tIF CFLAG:315 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1619-1620',
        any: [/请再夹紧一点…咿～！震起来了！？震起来了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1620',
        any: [/请再夹紧一点…咿～！震起来了！？震起来了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1622-1623',
        any: [/请再夹紧一点…咿～！震起来了～～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1623',
        any: [/请再夹紧一点…咿～！震起来了～～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1625-1626',
        any: [/不管用这种东西怎么折腾/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1626',
        any: [/不管用这种东西怎么折腾/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1628',
        any: [/^\t\tCFLAG:315 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1630-1646',
        any: [
          /^\t\tIF TALENT:76 == 1 && \(CFLAG:315 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1633-1635',
        any: [/把阴蒂玩到坏掉为止吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1634',
        any: [/把阴蒂玩到坏掉为止吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1635',
        any: [/^\t\t\tCFLAG:315 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1637-1639',
        any: [/小阴蒂一颤一颤的…变的好奇怪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1638',
        any: [/小阴蒂一颤一颤的…变的好奇怪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1639',
        any: [/^\t\t\tCFLAG:315 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1641-1643',
        any: [/不要震了…求求你不要再震了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1642',
        any: [/不要震了…求求你不要再震了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1643',
        any: [/^\t\t\tCFLAG:315 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1648',
        any: [/^ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1648-1663',
        any: [/^ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1650-1652',
        any: [/还在麻麻的呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1651',
        any: [/还在麻麻的呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1652',
        any: [/^\t\tCFLAG:375 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1654-1656',
        any: [/好像还想再被夹着呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1655',
        any: [/好像还想再被夹着呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1656',
        any: [/^\t\tCFLAG:375 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1658-1660',
        any: [/「哈啊…哈啊…哈啊…呜呜～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1659',
        any: [/「哈啊…哈啊…哈啊…呜呜～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1660',
        any: [/^\t\tCFLAG:375 = 1$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1669',
        any: [/^IF SELECTCOM == 15 && TEQUIP:15$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1669-1722',
        any: [/^IF SELECTCOM == 15 && TEQUIP:15$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1671-1694',
        any: [/^\tIF CFLAG:316 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1673-1678',
        any: [/还有这样的色情道具呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1674',
        any: [/还有这样的色情道具呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1675',
        any: [/神情陶醉的看着器具夹到了乳头上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1677-1678',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1678',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1680-1685',
        any: [/请用这个色情的道具…来更多地欺负乳头吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1681',
        any: [/请用这个色情的道具…来更多地欺负乳头吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1682',
        any: [/莞然一笑、把胸部伸了出来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1684-1685',
        any: [
          /鈍感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快楽/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1685',
        any: [
          /鈍感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快楽/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1687-1691',
        any: [/即使是这样%SELF_CALL\(TARGET\)%也/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1688',
        any: [/即使是这样%SELF_CALL\(TARGET\)%也/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1690-1691',
        any: [/SIF ABL:1 >= 3 && TALENT:TARGET:107/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1691',
        any: [
          /鈍感的乳头一被乳头夹挟住、器具就毫不间断的持续为已被开发完毕的乳头带来快楽/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1693',
        any: [/^\t\tCFLAG:316 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1695-1722',
        any: [
          /^\t\tIF TALENT:76 == 1 && \(CFLAG:316 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1698-1704',
        any: [/感觉全身心都变得淫荡起来了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1699',
        any: [/感觉全身心都变得淫荡起来了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1700',
        any: [/完全看不出聖女时期的清纯了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1702-1703',
        any: [/SIF ABL:1 >= 3 && TALENT:TARGET:107/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1703',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1704',
        any: [/^\t\t\tCFLAG:316 = 4$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1706-1712',
        any: [/乳头好舒服…还要…我还要/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1707',
        any: [/乳头好舒服…还要…我还要/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1708',
        any: [/一被主人欺负…就会感觉到主人的爱呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1710-1711',
        any: [/SIF ABL:1 >= 3 && TALENT:TARGET:107/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1711',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1712',
        any: [/^\t\t\tCFLAG:316 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1714-1719',
        any: [/再这样下去的话…啊啊～～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1715',
        any: [/再这样下去的话…啊啊～～/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1717-1718',
        any: [/SIF ABL:1 >= 3 && TALENT:TARGET:107/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1718',
        any: [/鈍感的乳头已被完全開発、器具毫不间断的持续为乳头带来快楽/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1719',
        any: [/^\t\t\tCFLAG:316 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1724',
        any: [/^ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1724-1739',
        any: [/^ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1726-1728',
        any: [/明明还想再用一会儿的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1727',
        any: [/明明还想再用一会儿的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1728',
        any: [/^\t\tCFLAG:376 = 3$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1730-1732',
        any: [/乳头麻麻的…好厉害的感觉/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1731',
        any: [/乳头麻麻的…好厉害的感觉/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1732',
        any: [/^\t\tCFLAG:376 = 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1734-1736',
        any: [/「咕呜嗯～…哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1735',
        any: [/「咕呜嗯～…哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1736',
        any: [/^\t\tCFLAG:376 = 1$/m],
      },

      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1745-1800',
        any: [/「啊啊～…奶水…就这样出来了～…好美妙～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1745',
        any: [/IF\ SELECTCOM\ ==\ 16\ \&\&\ TEQUIP:16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1747-1771',
        any: [/「啊啊～…奶水…就这样出来了～…好美妙～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1749-1754',
        any: [/「啊啊～…奶水…就这样出来了～…好美妙～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1750',
        any: [/「啊啊～…奶水…就这样出来了～…好美妙～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1751',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1753-1754',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1754',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1756-1761',
        any: [
          /「啊啊～…小宝宝…好想让小宝宝来喝呢～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1757',
        any: [
          /「啊啊～…小宝宝…好想让小宝宝来喝呢～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1758',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1760-1761',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1761',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1763-1768',
        any: [/「住、住手…放过我吧…啊啊…不要啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1764',
        any: [/「住、住手…放过我吧…啊啊…不要啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1765',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1767-1768',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1768',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1770',
        any: [/\	\	CFLAG:317\ =\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1771',
        any: [/;\	\	RETURN\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1772-1800',
        any: [
          /「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1775-1781',
        any: [
          /「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1776',
        any: [
          /「啊咿咿咿～♪…乳、乳头好像要融化了…奶汁一直在喷出来～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1777',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1779-1780',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1780',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1781',
        any: [/\	\	\	CFLAG:317\ =\ 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1783-1789',
        any: [
          /「啊啊啊～…啊～…嗯呜唔～…！呀啊啊…好想让小宝宝喝啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1784',
        any: [
          /「啊啊啊～…啊～…嗯呜唔～…！呀啊啊…好想让小宝宝喝啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1785',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1787-1788',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1788',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1789',
        any: [/\	\	\	CFLAG:317\ =\ 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1791-1797',
        any: [/「讨厌…讨厌…不要搾啊～…嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1792',
        any: [/「讨厌…讨厌…不要搾啊～…嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1793',
        any: [/榨乳器每次振動%SAVESTR:TARGET%的乳头就会喷出新鮮的奶汁………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1795-1796',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1796',
        any: [
          /%SAVESTR:TARGET%鈍感的乳头被完全開発了、搾乳带来的快楽持续的令%SAVESTR:TARGET%心动神驰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1797',
        any: [/\	\	\	CFLAG:317\ =\ 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1802',
        any: [/ELSEIF\ SELECTCOM\ ==\ 16\ \&\&\ TEQUIP:16\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1802-1820',
        any: [/「欸～～…明明还想再榨一些奶汁出来呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1804-1807',
        any: [/「欸～～…明明还想再榨一些奶汁出来呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1805',
        any: [/「欸～～…明明还想再榨一些奶汁出来呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1806',
        any: [/奶汁从%SAVESTR:TARGET%的乳头上滴答滴答地垂落下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1807',
        any: [/\	\	CFLAG:377\ =\ 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1809-1812',
        any: [/「啊啊～…哇、%SELF_CALL\(TARGET\)%的奶汁…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1810',
        any: [/「啊啊～…哇、%SELF_CALL\(TARGET\)%的奶汁…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1811',
        any: [/奶汁从%SAVESTR:TARGET%的乳头上滴答滴答地垂落下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1812',
        any: [/\	\	CFLAG:377\ =\ 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1814-1817',
        any: [/「呜…呜呜…奶汁…不要再出来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1815',
        any: [/「呜…呜呜…奶汁…不要再出来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1816',
        any: [/奶汁从%SAVESTR:TARGET%的乳头上滴答滴答地垂落下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1817',
        any: [/\	\	CFLAG:377\ =\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1869',
        any: [/IF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1869-1942',
        any: [
          /「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1871-1892',
        any: [
          /「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1873-1877',
        any: [
          /「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1874',
        any: [
          /「啊哈啊啊～…屁股眼里…咕呜～…被塞得满满的了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1876-1877',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%很有感觉地唤出声来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1877',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%很有感觉地唤出声来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1879-1883',
        any: [/「没、没事的…再来…全部塞进去吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1880',
        any: [/「没、没事的…再来…全部塞进去吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1882-1883',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1883',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1885-1889',
        any: [/「啊～、咿～～！？不行…不可能全部塞进去啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1886',
        any: [/「啊～、咿～～！？不行…不可能全部塞进去啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1888-1889',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%就悲鳴了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1889',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%就悲鳴了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1891',
        any: [/\	\	CFLAG:TARGET:320\ =\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1893-1942',
        any: [
          /「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1896-1902',
        any: [
          /「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1897',
        any: [
          /「啊～～…啊哈～…！屁股眼好爽～…请再欺负我吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1898',
        any: [/%SAVESTR:TARGET%由于肛门的快楽整个脑子都爽的要融化了似的………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1900-1901',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%反复厮磨着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1901',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%反复厮磨着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1902',
        any: [/\	\	\	CFLAG:320\ =\ 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1904-1909',
        any: [
          /「再来…再继续欺负我吧…让%SELF_CALL\(TARGET\)%的屁股眼变的更舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1905',
        any: [
          /「再来…再继续欺负我吧…让%SELF_CALL\(TARGET\)%的屁股眼变的更舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1907-1908',
        any: [
          /%SAVESTR:TARGET%还很鈍感的肛门被肛珠全部塞了进去、%SAVESTR:TARGET%好像很开心的摇着屁股作为回应………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1908',
        any: [
          /%SAVESTR:TARGET%还很鈍感的肛门被肛珠全部塞了进去、%SAVESTR:TARGET%好像很开心的摇着屁股作为回应………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1909',
        any: [/\	\	\	CFLAG:320\ =\ 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1911-1917',
        any: [/「啊～～…这个…好厉害…肚子里面…一缩一缩的…咿呀～～！不要拉～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1912',
        any: [/「啊～～…这个…好厉害…肚子里面…一缩一缩的…咿呀～～！不要拉～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1913',
        any: [/%SAVESTR:TARGET%不像话地张开嘴、发出快乐的呻吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1915-1916',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1916',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1917',
        any: [/\	\	\	CFLAG:320\ =\ 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1919-1924',
        any: [/「哈啊…啊啊～…一全部塞进去…腰都直不起来了…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1920',
        any: [/「哈啊…啊啊～…一全部塞进去…腰都直不起来了…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1922-1923',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%皱着眉头发出好像很痛苦的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1923',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%皱着眉头发出好像很痛苦的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1924',
        any: [/\	\	\	CFLAG:320\ =\ 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1926-1932',
        any: [/「啊啊…屁股…好像…变的很奇怪…不、不行…不要拉啊～～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1927',
        any: [/「啊啊…屁股…好像…变的很奇怪…不、不行…不要拉啊～～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1928',
        any: [/%SAVESTR:TARGET%不像话地张开嘴发出下流的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1930-1931',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1931',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、由于肛珠的圧迫感%SAVESTR:TARGET%娇喘出声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1932',
        any: [/\	\	\	CFLAG:320\ =\ 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1934-1939',
        any: [/「这、这样子…这样子全部塞进去的话…咿～、不要拉啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1935',
        any: [/「这、这样子…这样子全部塞进去的话…咿～、不要拉啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1937-1938',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%就悲鳴起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1938',
        any: [
          /一把肛珠全部塞进%SAVESTR:TARGET%鈍感的肛门里、%SAVESTR:TARGET%就悲鳴起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1939',
        any: [/\	\	\	CFLAG:320\ =\ 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1944',
        any: [/ELSEIF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1944-1963',
        any: [
          /「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1946-1948',
        any: [
          /「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1947',
        any: [
          /「噫呀呜呜呜呜～～～…可以再用力一点拔出来呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1948',
        any: [/\	\	CFLAG:379\ =\ 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1950-1952',
        any: [/「咕呜嗯～…啊哈…被撑的好宽啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1951',
        any: [/「咕呜嗯～…啊哈…被撑的好宽啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1952',
        any: [/\	\	CFLAG:379\ =\ 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1954-1956',
        any: [/「哈啊啊啊～～！…不、不行…屁股眼…再这样下去的话…真的要…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1955',
        any: [/「哈啊啊啊～～！…不、不行…屁股眼…再这样下去的话…真的要…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1956',
        any: [/\	\	CFLAG:379\ =\ 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1958-1960',
        any: [/「呀呜呜～…啊、啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1959',
        any: [/「呀呜呜～…啊、啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1960',
        any: [/\	\	CFLAG:379\ =\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1968-2210',
        any: [/^IF SELECTCOM == 20$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1968',
        any: [/IF\ SELECTCOM\ ==\ 20/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1970',
        any: [/\	IF\ CFLAG:TARGET:321\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1972',
        any: [/\	\	IF\ TALENT:0\ ==\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1974',
        any: [/\	\	\	IF\ TALENT:76\ ==\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1975',
        any: [
          /「啊啊…主人～…真的好开心…能为淫乱的%SAVESTR:TARGET%亲自破开处女膜～%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1976',
        any: [
          /%SAVESTR:TARGET%自己把两腿张开让%SAVESTR:PLAYER%的大鸡鸡插了进来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1977',
        any: [/「啊…呜…啊啊啊～～！进来啦～！主人的肉棒进来啦～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1978',
        any: [
          /「虽然有点痛…不过完全可以忍受…因为主人火热的大鸡鸡～…插进里面实在是太舒服了啊～%UNICODE\(/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1980',
        any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1981',
        any: [
          /%SAVESTR:TARGET%用两腿紧紧的挟住%SAVESTR:PLAYER%的腰发出了快活的呻吟/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1982',
        any: [/%SAVESTR:TARGET%与故郷的恋人相比选择了大鸡鸡的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1983',
        any: [
          /「好爽～好爽～好爽！ 被大鸡鸡弄得好爽啊～！已经…離不开它了～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1984-1985',
        any: [
          /%SAVESTR:TARGET%用两腿紧紧的挟住%SAVESTR:PLAYER%的腰发出了快活的呻吟/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1988',
        any: [/\	\	\	ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ ABL:10\ >=\ 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1989',
        any: [
          /「是…拜托了…主人…请把%SELF_CALL\(TARGET\)%重要的东西…夺走吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1990',
        any: [
          /%SAVESTR:TARGET%有点害羞的把两腿张开、把%SAVESTR:PLAYER%的大鸡鸡放了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1991',
        any: [
          /「嗯嗯～！…咕…呜啊…哈啊…哈啊…没关系的、这种程度没问题的…啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1992',
        any: [/%SAVESTR:TARGET%一边忍受着破瓜的苦痛一边回应着你的欲望………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1994',
        any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1995',
        any: [
          /（啊啊…%SELF_CALL\(TARGET\)%的…真命天子是…魔王大人………%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1996',
        any: [/%SAVESTR:TARGET%在心中已经把故郷的恋人给忘掉了的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '1999-2000',
        any: [/「求、求你了…再…温柔一点…啊～…咿～～…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2001',
        any: [/%SAVESTR:TARGET%被压在身上侵犯了、因为破瓜的痛楚而哭出声来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2003',
        any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2004',
        any: [
          /「啊啊～…%SELF_CALL\(TARGET\)%…明明想把贞洁…献给那个人的…啊～…啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2005',
        any: [/%SAVESTR:TARGET%想起故郷的恋人、更加伤心的哭了起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2009-2011',
        any: [/\	\	ELSE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2012',
        any: [
          /「主人～%UNICODE\(0x2661\) \*1%…紧紧地抱住我吧…让我们一起变的非常非常的快活吧%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2015',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被調教出了快感、很愉快的吞下了%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2017',
        any: [/\	\	\	ELSEIF\ TALENT:85\ ==\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2018',
        any: [
          /「用这种姿势做的话…总觉得心跳不已呢…啊、讨、讨厌、%SELF_CALL\(TARGET\)%…为什么要/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2019',
        any: [/%SAVESTR:TARGET%害羞的把脸埋进你的胸口………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2022',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、很愉快的吞下了%SAVESTR:PLA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2024-2025',
        any: [/「咕～…请、请不要看我的脸…哈咕呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2026',
        any: [/%SAVESTR:TARGET%一被插入就紧紧闭上眼睛嘴巴都歪了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2029',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、使她而由于被挿入的異物感而皱起了眉头。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2032-2033',
        any: [/\	\	CFLAG:321\ =\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2035-2038',
        any: [/\	ELSE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2039',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2040',
        any: [
          /「肉棒好棒～%UNICODE\(0x2661\) \*1%…好棒哦～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2041',
        any: [
          /%SAVESTR:TARGET%下流淫猥的声音在耳边回响着、如果是认识她的人听到的话一定会怀疑自己的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2042',
        any: [
          /「啊啊～…好棒～好棒～%UNICODE\(0x2661\) \*1%…再来～…疯狂地～…把精液滚滚地射进来/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2043',
        any: [
          /%SAVESTR:TARGET%用手脚缠住%SAVESTR:PLAYER%反复的接吻并被持续被侵犯着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2044',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2045',
        any: [
          /「啊～…啊啊啊～%UNICODE\(0x2661\) \*1%…要疯了～…要疯了啊～…咿～…咿～…要被肉棒/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2046',
        any: [
          /%SAVESTR:TARGET%被抽插着阴道深处痛的唤出声来、抱住了%SAVESTR:PLAYER%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2047',
        any: [
          /「%SELF_CALL\(TARGET\)%…已、已经…变的不被操小穴…就活不下去了～%UNICODE\(/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2048-2049',
        any: [
          /「请再…再用力操我的小穴吧%UNICODE\(0x2661\) \*1%…请用持久不倒的出色的大鸡鸡来操我/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2050',
        any: [
          /「已经…除了这个什么也不想了…小穴…再狠狠地操小穴吧…疯狂地操我吧～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2051',
        any: [
          /%SAVESTR:TARGET%用两脚勾住%SAVESTR:PLAYER%的腰、像动物似的娇喘起来…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2053',
        any: [/\	\	\	CFLAG:321\ =\ 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2055',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:75\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2056',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2057',
        any: [
          /「对、对不起…%SELF_CALL\(TARGET\)%…一被大鸡鸡插进来就…已…经、要…不行…了～%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2058',
        any: [
          /%SAVESTR:TARGET%像中毒患者似的牙齿不停地打着冷战并抱紧了%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2059',
        any: [
          /「嗯哦…啊啊…来～…吧～…動起来吧～…%SELF_CALL\(TARGET\)%的小穴～%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2060',
        any: [
          /如果是過去认识%SAVESTR:TARGET%的人听到这些下流的话肯定会以为自己耳朵出问题了、%SA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2061',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2062',
        any: [
          /「啊～…啊啊～…已、已经…分不清…是喜欢主人…还是喜欢大鸡鸡了%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2063',
        any: [
          /%SAVESTR:TARGET%被大鸡鸡插入阴道深处奄奄一息地痙攣着并紧紧地缠住大鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2064',
        any: [
          /「还要、还要…求求你…弄…弄壊也没事～…抱我～%UNICODE\(0x2661\) \*1% 爱我～%UN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2065-2066',
        any: [/「求你了…不要把大鸡鸡抜出来…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2067',
        any: [
          /%SAVESTR:TARGET%用双手搂住%SAVESTR:PLAYER%的脖子含情脉脉地抱住了%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2068',
        any: [
          /「想永远感受着你的大鸡鸡～%UNICODE\(0x2661\) \*1%…请尽情的把我干的一塌糊涂吧…%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2070',
        any: [/\	\	\	CFLAG:321\ =\ 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2072',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:75\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2073',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2074',
        any: [
          /「啊咿～…继续…侵犯我…请继续侵犯我吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2075',
        any: [
          /「小穴没被大肉棒插进去的话…就要发疯了啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2076',
        any: [
          /已经完全变成性爱狂的%SAVESTR:TARGET%用脚缠住%SAVESTR:PLAYER%的腰舍不/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2077',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2078',
        any: [/「小穴～…小穴还要～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2079',
        any: [
          /「请用大肉棒尽情地蹂躏小穴吧～…子宮的里面也…用、精液填满吧～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2080',
        any: [
          /已经不会再去考虑做爱之外的事情的%SAVESTR:TARGET%一边流着口水一边不断地说着下流的话…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2081-2082',
        any: [
          /「哈啊～…啊～啊啊啊～…继续…继续干我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2083',
        any: [/「已经…除了小穴其他什么也不想了～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2084',
        any: [
          /%SAVESTR:TARGET%看起来已经没法再考虑做爱之外的事情了、她堕落的脸上已经再也找不到一丝/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2086',
        any: [/\	\	\	CFLAG:321\ =\ 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2088',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2089',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2090',
        any: [
          /「啊啊啊～…大肉棒…在里面～…%UNICODE\(0x2661\) \*1% 咿～啊～…啊啊啊～%UNIC/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2092',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2093',
        any: [
          /「啊啊～…%SELF_CALL\(TARGET\)%的小穴里…变成大肉棒的形状了～…%UNICODE\(0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2094',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2095',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2097',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2098',
        any: [
          /「咕～…啊～…啊啊啊～………呐…还想再要…大鸡鸡啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2099',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。但是%SA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2100-2101',
        any: [
          /「再来…像禽兽一样的插进来…继续侵犯%SELF_CALL\(TARGET\)%吧～%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2102',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2104',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2105',
        any: [
          /「继续侵犯我吧～…%UNICODE\(0x2661\) \*1% 想要被操到小穴变形啊～%UNICODE\(/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2107',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2108',
        any: [
          /「哈啊…哈啊…好棒～…这样～…这种深度～…好棒…好棒～～～～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2109',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2110',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2112',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2113',
        any: [/「呜咕呜～…进来了…进来了～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2114',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。但是%SA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2115-2116',
        any: [
          /「哈啊…哈啊…好棒～…这样～…这种深度～…好棒…好棒～～～～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2117',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2119-2120',
        any: [
          /「啊～啊啊～哈呜呜～…和主人做爱被操着小穴感觉格外的舒服呢～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2121',
        any: [
          /「早知道是这么快乐这么舒服的事情的话…真想更早一点的体验到呢…%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2123',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2124',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2125',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2127',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2128',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。但是%SA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2129-2130',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容继续做爱着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2133',
        any: [/\	\	\	CFLAG:321\ =\ 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2135',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2136',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2137',
        any: [
          /「啊啊…请更多的疼爱我…啊～…嗯～…这样…真舒服～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2139',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2140',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2141',
        any: [
          /「主人能这样疼爱我并教会我如此愉悦的事情…真是…感激…不尽%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2142',
        any: [/%SAVESTR:TARGET%好像很舒服的仰起下巴、呼了口气………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2144',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2145',
        any: [/「啊啊…呜、好深…好深啊………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2146',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2147',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2148-2149',
        any: [
          /「啊啊…被爱着的愉悦…真美妙…%UNICODE\(0x2661\) \*1% 啊～…啊啊～…又插的…更深了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2150',
        any: [/%SAVESTR:TARGET%每当被插进阴道深处就会发出娇喘声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2152',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2153',
        any: [/「哈啊…啊啊～…嗯～…再用力…抱我～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2155',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2156',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2157',
        any: [
          /「好棒～…这样好棒～…%UNICODE\(0x2661\) \*1% 啊啊～…请让我变得更舒服吧…%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2158',
        any: [
          /%SAVESTR:TARGET%脉脉含情地在%SAVESTR:PLAYER%的耳边轻声说着并发出了娇/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2160',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2161',
        any: [/「哈咕呜～…啊、啊啊啊…求…求你了…再…温柔一点…啊呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2162',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2163',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2164-2165',
        any: [
          /「还想…还想更多地感受着主人～…所以…所以～…啊～…啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2166',
        any: [
          /%SAVESTR:TARGET%不好意思的笑了并动起了腰身、抛着媚眼索求着快乐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2168-2169',
        any: [/「那、那个…再…再激烈一点也可以哦…咿呀～～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2170',
        any: [
          /「是、是的…对不起…我会老实说的！…还想…还想和你一起变的更舒服呢………%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2172',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2173',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快地吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2174',
        any: [
          /%SAVESTR:TARGET%不好意思的笑了并动起了腰身、抛着媚眼索求着快乐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2176',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2177',
        any: [
          /%SAVESTR:TARGET%的私处还不太容易有感觉、而由于被挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2178',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2179-2180',
        any: [/%SAVESTR:TARGET%不好意思的笑了并动起了腰身、抛着媚眼撒娇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2183',
        any: [/\	\	\	CFLAG:321\ =\ 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2185',
        any: [
          /\	\	ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:321\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2186',
        any: [
          /「咕呜～…呜呜～！啊～啊啊啊啊！再、再这样下去的话…%SELF_CALL_FIRST\(TARGET\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2187',
        any: [/「真的…不行了…要不行了啊…明明是被侵犯…竟然会这么的…啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2190',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得感觉到了快乐、很愉快的吞下了%SAVESTR:PL/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2191',
        any: [/\	\	\	CFLAG:321\ =\ 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2193',
        any: [
          /\	\	ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:321\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2194',
        any: [/「啊咕～…啊呜唔～♪…没、没事的…请随意动起来吧…啊啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2197',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、而由于被挿入的異物感而皱起了眉头。%SAV/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2198',
        any: [/\	\	\	CFLAG:321\ =\ 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2200',
        any: [/\	\	ELSEIF\ CFLAG:321\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2201',
        any: [/「啊～…呜…咕～…哈咕～！…呜呜呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2202',
        any: [/%SAVESTR:TARGET%咬牙忍受着鈍痛感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2205',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、而由于被挿入的異物感而皱起了眉头。%SAV/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2206-2208',
        any: [/\	\	\	CFLAG:321\ =\ 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2215',
        any: [/IF\ SELECTCOM\ ==\ 21/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2215-2416',
        any: [/^IF SELECTCOM == 21$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2217',
        any: [/\	IF\ CFLAG:TARGET:322\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2219',
        any: [/\	\	IF\ TALENT:0\ ==\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2221',
        any: [/\	\	\	IF\ TALENT:76\ ==\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2222',
        any: [/%SAVESTR:TARGET%用跪坐的姿势并把头贴在地上、将屁股高高抬起。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2223',
        any: [
          /「能被您夺走%SELF_CALL\(TARGET\)%的第一次……我从心底表示感謝～%UNICODE\(0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2224',
        any: [/%SAVESTR:PLAYER%抓住她的腰毫不犹豫的把肉棒插进了阴道深处。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2225',
        any: [/途中感到穿破了处女膜。肉棒一进入深处就被温热的阴道壁紧紧包住。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2226',
        any: [
          /「呀啊呜唔～…淫乱的处女膜被弄破了～…啊啊～…好开心～好开心啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2228',
        any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2229',
        any: [
          /%SAVESTR:TARGET%比起故郷的恋人而选择了能为自己带来无限快乐的鸡鸡的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2230',
        any: [
          /「嗯～♪…%SELF_CALL\(TARGET\)%的恋人是…世界上所有的大鸡鸡～…不过最喜欢的是现在插/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2233',
        any: [/\	\	\	ELSEIF\ TALENT:85\ ==\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2234',
        any: [
          /「从、从后面来吗…没、没事的…那、那个请温柔一点…咿呀啊啊～～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2235',
        any: [
          /%SAVESTR:PLAYER%向%SAVESTR:TARGET%发出了决定性的一击将阴茎插进了阴道/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2236',
        any: [/途中感到穿破了处女膜。%SAVESTR:TARGET%禁不住悲鳴起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2237',
        any: [
          /「啊～啊咿～～～！…总觉得～…这样好像和动物似的呢…好棒～…好棒啊～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2239',
        any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2240',
        any: [
          /「啊啊～…%SELF_CALL\(TARGET\)%是…魔王大人的所有物～…絶対不会背离的%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2241',
        any: [/%SAVESTR:TARGET%的脑海里已经把故郷的恋人完全忘掉了的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2244-2245',
        any: [/「这、这种像动物一般的姿势…咕呜…呜呜～…啊～啊啊啊啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2247',
        any: [/\	\	\	\	\	IF\ TALENT:TARGET:317\ ==\ 4\ /m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2248',
        any: [/「啊啊～…对不起…对不起～…呜呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2249',
        any: [/%SAVESTR:TARGET%想起故郷的恋人、流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2253-2255',
        any: [/\	\	ELSE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2256',
        any: [
          /「是～…请尽管从后面来吧%UNICODE\(0x2661\) \*1%　哈啊～～…果然被侵犯真是最棒了～%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2257',
        any: [/「再来啊…把我侵犯到坏掉吧～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2260',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被调教出了快感、很愉快的吞下了从后面插进来的%SAVEST/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2262',
        any: [/\	\	\	ELSEIF\ TALENT:85\ ==\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2263',
        any: [/「啊～…这个姿势好害羞…不过………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2264',
        any: [/「啊～啊啊啊～…！讨厌…明明很害羞却兴奋起来了～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2265',
        any: [/「更多…请更多的疼爱我吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2268',
        any: [
          /%SAVESTR:TARGET%鈍感的私处经过開発觉醒了快感、很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2270-2271',
        any: [/「不要用这种像动物一样的姿势…这样…不行…啊啊啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2274',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2277-2278',
        any: [/\	\	CFLAG:322\ =\ 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2280-2282',
        any: [/\	ELSE/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2283',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2284',
        any: [
          /「嗯哈啊～啊～啊啊～咿啊啊啊～！%UNICODE\(0x2661\) \*1% 再用力插我～%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2285',
        any: [
          /「还想再要大肉棒～%UNICODE\(0x2661\) \*1% 想要更多…更多的大肉棒啊～%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2286',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2287',
        any: [
          /「已经…只要有大肉棒插进来的话…是谁都无所谓了～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2288',
        any: [
          /%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰好像为了拍打屁股似的一次一次/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2289',
        any: [
          /「啊咿呀啊～%UNICODE\(0x2661\) \*1% 好棒～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2290-2291',
        any: [
          /「嗯～嗯嗯～嗯～…啊呜唔呜…不要拔出来…不要把大肉棒拔出来…%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2292',
        any: [/%SAVESTR:TARGET%淫荡的扭着屁股、向%SAVESTR:PLAYER%撒娇。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2293',
        any: [
          /「我已经…没有大肉棒…就活不去了～…呜啊…不要拔…啊～%UNICODE\(0x2661\) \*1%啊啊～/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2295',
        any: [/\	\	\	CFLAG:322\ =\ 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2297',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:75\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2298',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2299',
        any: [/「啊啊～…再来～…再来啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2300',
        any: [/%SAVESTR:TARGET%用平常想象不出来的样子淫荡地扭着屁股。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2301',
        any: [
          /「好深…好棒～…主人…请再侵犯我的小穴吧…～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2302',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2303',
        any: [
          /「%SELF_CALL\(TARGET\)%的屁股…小穴…都是为了取悦主人而存在的…%UNICODE\(0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2304',
        any: [/「所以…请尽管随意使用吧～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2305',
        any: [
          /%SAVESTR:TARGET%为了能让自己被更多的侵犯而用令人心神荡漾的声音向你撒娇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2306-2307',
        any: [/「请更多地欺负我的小穴吧～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2308',
        any: [/「请在主人専用的小穴里用精液播种吧～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2309',
        any: [
          /已经完全陷落并沉溺于性爱的快乐中的%SAVESTR:TARGET%不知羞耻地淫荡地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2311',
        any: [/\	\	\	CFLAG:322\ =\ 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2313',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:75\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2314',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2315',
        any: [/「啊啊～…请再像…动物一样的操我吧～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2316',
        any: [/「%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%已经是…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2317',
        any: [/每次抽送、%SAVESTR:TARGET%的私处都会溢出泡沫一样的爱液………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2318',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2319',
        any: [/「再…用力插…想被大肉棒塞得满满的～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2320',
        any: [/「已经…不会再去想做爱之外的事情了～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2321',
        any: [/%SAVESTR:TARGET%好像想被进一步侵犯似的高高抬起了屁股………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2322-2323',
        any: [
          /「不管被侵犯几次…都不会生厌…已经…不会去想…没有做爱的生活了～…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2324',
        any: [/「所以～…更多更多地侵犯我吧～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2325',
        any: [
          /%SAVESTR:TARGET%像变成一只动物似的、连子宫口都臣服于做爱的快感中而敞开了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2327',
        any: [/\	\	\	CFLAG:322\ =\ 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2329',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2330',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2331',
        any: [
          /「呀呜～！哈啊…啊啊～…咿呀～～！好爽啊～…随心所欲的叫床！要变成动物了～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2332',
        any: [/「咿呀～啊啊～…啊啊～…好喜欢！像动物一样的做爱好喜欢啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2333',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2334',
        any: [
          /「啊～…啊啊～…好紧～！再来～…再使用%SELF_CALL\(TARGET\)%的身体吧…请尽情使用～%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2335',
        any: [
          /「%SAVESTR:TARGET%是非常喜欢被人从后面哧噗哧噗地侵犯的変態勇者啊～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2336-2337',
        any: [/「啊～啊啊～…像动物一样的做爱好爽啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2338',
        any: [
          /「一被这样侵犯…就好像自己变成了最低等的动物似的…最棒…了～%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2341',
        any: [/\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2342',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被调教出了快感、好像很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2344',
        any: [/\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2345',
        any: [
          /虽然%SAVESTR:TARGET%的私处不容易有感觉、但还是感觉到了自己正被从后面侵犯的事实的样子/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2347',
        any: [/\	\	\	CFLAG:322\ =\ 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2349',
        any: [
          /\	\	ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2350',
        any: [/\	\	\	IF\ RAND:3\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2351',
        any: [/「啊啊～…啊～…好舒服～！请继续…侵犯我吧…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2352',
        any: [/「被你这样做是最…最舒服的事情了…咿呀～～…啊啊～…好开心…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2354',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2355',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2357',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2358',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2359',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2361',
        any: [/\	\	\	ELSEIF\ RAND:2\ ==\ 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2362',
        any: [
          /「啊啊～…%SELF_CALL\(TARGET\)%的屁股就是为了像这样被主人侵犯而存在的呢…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2363',
        any: [/「是～…直到主人満足为止…请把精液满满地注入进来吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2365',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2366',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2368',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2369',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2370',
        any: [
          /但是比起这个%SAVESTR:TARGET%更为被%SAVESTR:PLAYER%所抱住的这一事实而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2372-2373',
        any: [
          /「哈啊～～…不要太过欺负%SELF_CALL\(TARGET\)%的小穴啊～…咿咿咿咿～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2374',
        any: [
          /%SAVESTR:PLAYER%抓住哀叫着的%SAVESTR:TARGET%的屁股、更加粗暴地往阴道/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2375',
        any: [/%SAVESTR:TARGET%发出了格外尖厉的悲鸣声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2377',
        any: [/\	\	\	\	IF\ ABL:2\ >=\ 3\ \&\&\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2378',
        any: [
          /「咿呀～…呀呜～啊～啊啊啊～！对不起～…其实被欺负真的好爽啊～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2379',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、毫不间断的持续为%SAVESTR:TA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2381',
        any: [/\	\	\	\	ELSEIF\ TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2382',
        any: [
          /虽然%SAVESTR:TARGET%的私处不容易有感觉、但还是感觉到了自己正被从后面侵犯的事实的样子/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2383-2384',
        any: [
          /「咿呀～…呀呜～啊～啊啊啊～！对不起～…其实被欺负真的好爽啊～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2387',
        any: [/\	\	\	CFLAG:322\ =\ 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2389',
        any: [
          /\	\	ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:322\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2390',
        any: [/「哈啊～…啊啊～啊～…啊啊～！不、不行…再这样被用力地做的话～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2391',
        any: [/「就、就会变的只知道…只知道大鸡鸡了啊～…啊啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2394',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、很愉快的吞下了从后面插进来的%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2395',
        any: [/\	\	\	CFLAG:322\ =\ 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2397',
        any: [
          /\	\	ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:322\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2398',
        any: [
          /（啊啊…%SELF_CALL\(TARGET\)%竟然把屁股抬得这么高也能无动于衷…呜呜）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2399',
        any: [/%SAVESTR:TARGET%咬牙忍耐着并在阴道深处被侵犯时发出呻吟。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2400',
        any: [/「哈啊～…啊啊～啊～…啊啊～！…咕呜～…咿～…嗯～啊呜呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2403',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2404',
        any: [/\	\	\	CFLAG:322\ =\ 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2406',
        any: [/\	\	ELSEIF\ CFLAG:322\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2407',
        any: [
          /「这样…完全算不了什么…咦～…这不是像动物一样吗…？不、不对…你搞错了…吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2408',
        any: [/「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%是…人类/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2411',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、由于被从后面挿入的異物感而皱起了眉头。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2412-2414',
        any: [/\	\	\	CFLAG:322\ =\ 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2421',
        any: [/IF\ SELECTCOM\ ==\ 22/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2421-2585',
        any: [/^IF SELECTCOM == 22$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2421',
        any: [/IF SELECTCOM == 22/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2422',
        any: [/\tIF CFLAG:TARGET:323 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2424',
        any: [/\t\tIF TALENT:0 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2426',
        any: [/\t\t\tIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2426-2427',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2429-2430',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2433-2435',
        any: [/\t\t\tIF TALENT:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2436',
        any: [/「嗯啾…啾～…嗯啾唔唔…啊啊啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2437',
        any: [
          /「一边和主人接吻…一边被操着小穴真是太棒了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2439-2440',
        any: [/\t\t\t\tSIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2442',
        any: [/\t\t\tELSEIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2443',
        any: [/「啊～…呜啊～…呀呜～…不、不行了…被这样吻的话…啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2444',
        any: [
          /「那个地方…太有感觉了～…咿呀～～啊～啊啊～…被插的快不行了啊～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2446-2447',
        any: [/\t\t\t\tSIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2449-2450',
        any: [/「还能这样做啊…啊～～…啊～…啊呜～…再…温柔一点…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2451',
        any: [/%SAVESTR:TARGET%有点生疏地动着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2453-2454',
        any: [/\t\t\t\tSIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2457-2458',
        any: [/\t\tCFLAG:323 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2460-2462',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 8 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2463',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2464',
        any: [
          /「啊啊啊～…大肉棒插得好深…主人的大肉棒插得好深啊～%UNICODE\(0x2661\) \*1% 插进小穴的深处了～%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2465',
        any: [
          /%SAVESTR:TARGET%一边发出淫荡的娇喘声一边在%NAME:MASTER%的身上晃动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2466',
        any: [
          /「再多的～…让我感受大肉棒吧%UNICODE\(0x2661\) \*1% 把精液满满地射进来～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2467',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2468',
        any: [
          /「啊～%UNICODE\(0x2661\) \*1% 啊啊～%UNICODE\(0x2661\) \*1%…主人的大肉棒～…全部插进来让%SELF_CA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2469',
        any: [
          /%SAVESTR:TARGET%用自己的双腿像蜘蛛一样缠住了%NAME:MASTER%的腰并自己剧烈地动起了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2470',
        any: [
          /「嗯哈啊～～%UNICODE\(0x2661\) \*1%…这个肉棒好棒～！好棒啊～！…果然已经不能没有大肉棒了啊～%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2471-2472',
        any: [
          /「啊啊啊啊～…大肉棒一进来…就、要、不行了…已经…什么事情都不想考虑了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2473',
        any: [
          /%SAVESTR:TARGET%的阴道深处被肉棒深深地插了进去、她的眼睛里已经完全失去了理性之光。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2474',
        any: [
          /「嗯咕呜呜嗯唔…啊～啊啊～啊哈啊啊～…哈啊啊…再插…再插吧～…要疯掉啦～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2476',
        any: [/\t\t\tCFLAG:323 = 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2478',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 7 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2479',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2480',
        any: [/「啊啊～…主人不用动也行哦～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2481',
        any: [/%SAVESTR:TARGET%用迷醉而荡漾的眼神看着你、自己开始动了起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2482',
        any: [
          /「这大鸡鸡全部都是%SELF_CALL\(TARGET\)%的～%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2483',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2484',
        any: [
          /「嗯咕呜…啊～啊啊啊…好幸福～%UNICODE\(0x2661\) \*1%…感觉好幸福啊～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2485',
        any: [/%SAVESTR:TARGET%抱着%NAME:MASTER%不停地发出放荡的娇喘声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2486',
        any: [
          /「%SELF_CALL\(TARGET\)%的小穴…已经变成主人的専用小穴了～%UNICODE\(0x2661\) \*1% 千万别拔出来哦～%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2487-2488',
        any: [
          /「啊咿呀啊～…里面…贴在一起了%UNICODE\(0x2661\) \*1% 再紧点…再紧紧的抱住我～…不要拔～%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2489',
        any: [
          /按照%SAVESTR:TARGET%所说的紧紧顶住阴道口、她就在%SAVESTR:PLAYER%的耳边呼着灼热的气息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2490',
        any: [
          /「哈啊…哈啊…请用%SELF_CALL\(TARGET\)%的淫荡小穴～…尽情享受吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2492',
        any: [/\t\t\tCFLAG:323 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2494',
        any: [
          /\t\tELSEIF TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2495',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2496',
        any: [
          /「啊啊～…还要…再来…再来～…欺负小穴吧～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2497',
        any: [/%SAVESTR:TARGET%抱住%NAME:MASTER%、秀眉因为快感而颤动不已。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2498',
        any: [/%SAVESTR:TARGET%已经除了做爱之外啥都不想了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2499',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2500',
        any: [/「动、动啊～…请再动吧～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2501',
        any: [
          /「我还想再要大肉棒～…真拿你没办法呢～…啊啊～…原谅我…原谅我～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2502',
        any: [
          /%SAVESTR:TARGET%一边不成体统的撒娇着一边自己摇着腰贪求着快楽………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2503-2504',
        any: [
          /「哈咿呀啊～%UNICODE\(0x2661\) \*1% 大肉棒%UNICODE\(0x2661\) \*1% 大肉棒～%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2505',
        any: [
          /「小穴…已经…要不行啦～…啊啊～%UNICODE\(0x2661\) \*1% 啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2506',
        any: [/%SAVESTR:TARGET%不成体统的大张着嘴贪求着快楽………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2508',
        any: [/\t\t\tCFLAG:323 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2510',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2511',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2512',
        any: [
          /「啾～啾～…嗯呜唔呜…喜欢…好喜欢…唔嗯…不管是做爱还是主人都好喜欢哦？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2513',
        any: [
          /「竟然还有这么舒服的事情…多亏主人能告诉我真是太感謝了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2514',
        any: [/「所以～…再多多的和我做吧～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2515',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2516',
        any: [/「呀呜唔～…啊～啊啊～…请再用力插我～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2517',
        any: [/「呀～啊啊啊～…咕～…好紧～%UNICODE\(0x2665\) \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2518',
        any: [
          /「再…再贴紧一点～…好想被干到心醉神驰啊～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2519-2520',
        any: [/「哈呜～…啊啊～啊～…啊啊～～！喜欢～好喜欢～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2521',
        any: [/「大肉棒不要拿走～…好想一直这样下去～！不要走～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2524',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2525',
        any: [
          /%SAVESTR:TARGET%鈍感的私处经由调教开发获得了快感、持续不断地带给%SAVESTR:TARGET%淫靡的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2527',
        any: [/\t\t\t\tELSEIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2528',
        any: [
          /%SAVESTR:TARGET%的私处不太容易有感觉、只有被鸡鸡侵犯的事实在脑海中回荡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2529-2530',
        any: [
          /%SAVESTR:TARGET%的私处像想要紧紧缠住%SAVESTR:PLAYER%的鸡鸡似的蠢动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2532',
        any: [/\t\t\tCFLAG:323 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2534',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2535',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2536',
        any: [/「哈啊～…啊～嗯～…请热烈地…亲我…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2537',
        any: [/「一这样做…每次接吻…都感觉快要去了～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2538',
        any: [
          /「咿呀～～啊～啊啊～！再、再这样亲吻下去的话～…啊～啊～啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2539',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2540',
        any: [/「嗯啾～…啾～…噗啊～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2541',
        any: [
          /「%SELF_CALL\(TARGET\)%的身体…是为了和主人以爱结合才存在的～…额呵呵♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2542',
        any: [/%SAVESTR:TARGET%含情脉脉的看着你的脸。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2543-2544',
        any: [/「哈啊～…啊～啊啊啊～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2545',
        any: [/「不要～…不要拔出来…再抱紧一点…不要拔出来～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2548',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2549',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、毫不间断的带给%SAVESTR:TARGET%甘美的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2551',
        any: [/\t\t\t\tELSEIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2552',
        any: [
          /%SAVESTR:TARGET%的私处不太容易有感觉、只有被%SAVESTR:PLAYER%抱了的事实在脑海中回荡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2553-2554',
        any: [
          /%SAVESTR:TARGET%的私处像想要紧紧缠住%SAVESTR:PLAYER%的鸡鸡似的蠢动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2556',
        any: [/\t\t\tCFLAG:323 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2558',
        any: [
          /\t\tELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2559',
        any: [
          /「哈啊～…啊～咕呜～！…不要～…不要让紧紧黏在一起的小鸡鸡和小穴分开啊～…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2561-2562',
        any: [/\t\t\tSIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2563',
        any: [/\t\t\tCFLAG:323 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2565',
        any: [/\t\tELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2567',
        any: [/\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2568',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、而由于被挿入的異物感而皱起了眉头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2569',
        any: [/「啊啊～啊～哈呜～………咕～……啊～啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2570',
        any: [/%SAVESTR:TARGET%忍耐着还是发出了痛苦的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2571-2572',
        any: [/「啊啊～啊～哈呜～…为什么…不拔出来啊～？…啊～啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2574',
        any: [/\t\t\tCFLAG:323 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2576',
        any: [/\t\tELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2577',
        any: [/「啊～啊啊…嗯～嗯呜唔～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2579-2580',
        any: [/\t\t\tSIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2581',
        any: [/\t\t\tCFLAG:323 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2590',
        any: [/IF\ SELECTCOM\ ==\ 23/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2590-2757',
        any: [/^IF SELECTCOM == 23$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2595-2596',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2598-2599',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2590',
        any: [/IF SELECTCOM == 23/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2591',
        any: [/\tIF CFLAG:TARGET:324 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2593',
        any: [/\t\tIF TALENT:0 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2595',
        any: [/\t\t\tIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2602-2604',
        any: [/\t\t\tIF TALENT:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2605',
        any: [
          /「呀啊～…啊～…啊啊～…主人…请更多的…更多的欺负我吧…%UNICODE\(0x2665\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2607-2608',
        any: [/\t\t\t\tSIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2610',
        any: [/\t\t\tELSEIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2611',
        any: [/「一这样被从后面抱住…就觉得有点不好意思呢…呀～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2612',
        any: [
          /「真、真是的…明明好不容易感到爱意、就搞这种恶作剧…呀呜～！咿呀～…呀啊～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2614-2615',
        any: [/\t\t\t\tSIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2617-2618',
        any: [/「啊～…不、不要…这种姿势…好深…呀啊～不要啊～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2620-2621',
        any: [/\t\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2622-2623',
        any: [/%SAVESTR:TARGET%被鸡鸡插进阴道深处有点痛苦的喘息着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2627-2628',
        any: [/\t\tCFLAG:324 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2630-2632',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 8 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2633',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2634',
        any: [
          /「嗯啊～…啊～哈啊啊啊…再动啊～%UNICODE\(0x2661\) \*1% 让我好好感下吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2635',
        any: [/%SAVESTR:TARGET%的话已经变得下流淫靡而不堪入耳了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2636',
        any: [
          /「啊～啊啊啊…%UNICODE\(0x2661\) \*1% 感到大肉棒了～好有感觉啊～～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2637',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2638',
        any: [
          /「啊啊～…嗯～嗯哈～…啊啊～…更多的…请更多的欺负我吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2639',
        any: [
          /「乳房快揉碎了…小穴也要磨破了、好爽…尽情的干我啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2640',
        any: [/%SAVESTR:TARGET%爽的已经完全不去考虑其他的事情了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2641-2642',
        any: [
          /「嗯咿嗯～咿啊～啊～啊啊啊～…不要拔…不要把大肉棒拔出来…再让我更舒服吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2643',
        any: [/%SAVESTR:TARGET%把两条腿打开成Ｏ型、如狼似虎地上下摇晃着腰身。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2644',
        any: [
          /「啊啊啊～…好爽啊…小穴…已经…好像要融化了～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2646',
        any: [/\t\t\tCFLAG:324 = 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2648',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 7 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2649',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2650',
        any: [/「啊～～…啊～啊哈～…啊啊啊………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2651',
        any: [/%SAVESTR:TARGET%一被鸡鸡插进深处就发出了快乐的呻吟声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2652',
        any: [
          /「已经…不行了…这个大鸡鸡是…%SELF_CALL\(TARGET\)%的…只属于%SELF_CALL\(TARGET\)%的啊…啊啊～啊～啊哈啊%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2653',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2654',
        any: [
          /「啊啊啊…更多的…侵犯我…%SELF_CALL\(TARGET\)%的小穴～…%UNICODE\(0x2661\) \*1% 请把它干得一塌糊涂吧～%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2655',
        any: [/%SAVESTR:TARGET%把两条腿打开成Ｏ型、淫荡地前後摇动着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2656',
        any: [
          /「%SELF_CALL\(TARGET\)%只顾着自己爽真是对不起了呢～～…不过～%UNICODE\(0x2661\) \*1%但是～%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2657-2658',
        any: [
          /「更多…更多的侵犯我吧～%UNICODE\(0x2661\) \*1% 把%SELF_CALL\(TARGET\)%的淫荡小穴…进一步的玷污吧～%UN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2659',
        any: [/%SAVESTR:TARGET%挺着腰身、高声哭叫着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2660',
        any: [
          /「请用主人的精液…把小穴装的满满的吧～…拜托了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2662',
        any: [/\t\t\tCFLAG:324 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2664',
        any: [
          /\t\tELSEIF TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2665',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2666',
        any: [
          /「啊啊～…用这种不像话的姿势…感觉格外的舒服呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2667',
        any: [
          /「哈啊～…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已经…已经…%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2668',
        any: [/%SAVESTR:TARGET%沉溺于性爱之中、娇喘不已………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2669',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2670',
        any: [/「好深啊…大肉棒插得好深啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2671',
        any: [
          /「呀啊呜～%UNICODE\(0x2661\) \*1% 啊啊啊～…%SELF_CALL\(TARGET\)%的小穴…感觉变的收缩起来了～…%UNIC/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2672',
        any: [/%SAVESTR:TARGET%像痙攣了似的不断收缩着阴道口………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2673-2674',
        any: [
          /「啊啊～…啊哈啊～…好美味啊…大肉棒好美味啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2675',
        any: [/%SAVESTR:TARGET%贪婪的上下动着腰、享受着%NAME:MASTER%的肉棒。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2676',
        any: [/「请更多的…更多的欺负我吧～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2678',
        any: [/\t\t\tCFLAG:324 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2680',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2681',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2682',
        any: [
          /「啊～啊～♪哈啊～～%UNICODE\(0x2665\) \*1%　大肉棒扑哧扑哧的插进小穴里的样子全部都看到了～%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2683',
        any: [
          /「好爽～好舒服啊～…被用不像话的体位干着好有感觉啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2684',
        any: [/「更多更多的尽情操我吧～……主人～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2685',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2686',
        any: [/「哈啊～啊啊～啊～～…更多…更多的操我…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2687',
        any: [
          /「一边被啪叽啪叽地揉着乳房～…一边被干着小穴就…咿～咿～咿～咿啊啊啊啊～%UNICODE\(0x2665\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2688',
        any: [/「啊～啊啊啊啊…又、高潮了～～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2689-2690',
        any: [/「咿呀～～！啊啊～…呜…更多的…欺负小穴吧～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2691',
        any: [
          /「%SELF_CALL\(TARGET\)%的身体是～…为取悦主人而存在的～…%UNICODE\(0x2665\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2692',
        any: [
          /「所以～…请继续尽情的欺负我吧～～～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2695-2696',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2698-2699',
        any: [/\t\t\t\tELSEIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2700-2701',
        any: [
          /%SAVESTR:TARGET%的私处像想要紧紧缠住%SAVESTR:PLAYER%的鸡鸡似的蠢动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2703',
        any: [/\t\t\tCFLAG:324 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2705',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2706',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2707',
        any: [/「哈啊～…啊啊～…啊咕～！嗯呜唔～…更多的…请更多地操我吧～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2708',
        any: [/「啊啊～…明明是这么不像话的姿势…只是被从后面抱着～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2709',
        any: [
          /「就感到很幸福…心情变的好爽啊～…啊～啊～啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2710',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2711',
        any: [/「主人～…啊啊啊～…啊～～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2712',
        any: [
          /「被这样做、就好像…变成了主人的玩具似的呢…额呵呵…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2713',
        any: [
          /%SAVESTR:PLAYER%抓住说出可爱发言的%SAVESTR:TARGET%的腰像玩弄般的摇动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2714',
        any: [/「呀啊～！啊～～啊啊～啊啊～…真好～当个玩具真好～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2715-2716',
        any: [/「哈啊～啊～啊～%UNICODE\(0x2661\) \*1% 啊啊啊～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2717',
        any: [
          /「主人的体温…好温暖～…哈啊～～%UNICODE\(0x2661\) \*1% 被温柔的抱住………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2718',
        any: [
          /「被主人疼爱着～…单是想着这个就好像要高潮了呢…啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2721-2722',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2724-2725',
        any: [/\t\t\t\tELSEIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2726-2727',
        any: [
          /%SAVESTR:TARGET%的私处像想要紧紧缠住%SAVESTR:PLAYER%的鸡鸡似的蠢动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2729',
        any: [/\t\t\tCFLAG:324 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2731',
        any: [
          /\t\tELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:324 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2732',
        any: [
          /「啊～啊啊～…啊啊～、即、即使不被那样插也…好、好有感觉～好有感觉啊～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2734-2735',
        any: [/\t\t\tSIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2736',
        any: [/\t\t\tCFLAG:324 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2738',
        any: [/\t\tELSEIF MARK:2 == 3 && \(CFLAG:324 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2739',
        any: [
          /「把、把脚张的更大一点的话…会更好吧…啊啊～…呜、好深…插得好深啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2741-2742',
        any: [/\t\t\tSIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2743',
        any: [/\t\t\tCFLAG:324 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2745',
        any: [/\t\tELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2746',
        any: [/「哈啊～…啊啊～…啊～…竟用这种姿势…从下面…咿呀呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2748-2749',
        any: [/\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2750-2751',
        any: [/%SAVESTR:TARGET%被鸡鸡插进阴道深处有点痛苦的喘息着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2753',
        any: [/\t\t\tCFLAG:324 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2762',
        any: [/IF\ SELECTCOM\ ==\ 26/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2762-2854',
        any: [/^IF SELECTCOM == 26$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2762',
        any: [/IF SELECTCOM == 26/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2764',
        any: [/\tIF CFLAG:TARGET:327 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2766',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2767',
        any: [/「啊～…啊啊～…咕呜嗯～…啊啊～明明是不能插进去的地方…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2768',
        any: [/「肉棒…把屁股眼撑大了…咿啊啊～啊啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2770-2771',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2773',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2774',
        any: [/「不、不行啊、那种地方大鸡鸡怎么能插得进去…呀呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2775',
        any: [/「啊啊…啊…不会吧…全部…插进去了…啊啊～…啊～啊哈啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2777-2778',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2780-2781',
        any: [
          /「不、不要啊～…不要…插进来…啊啊～…连屁股眼…都被你的东西玷污了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2783-2784',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2786-2787',
        any: [/\t\tCFLAG:TARGET:327 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2789-2791',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2792',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2793',
        any: [/「啊～啊啊～…屁股眼好爽啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2794',
        any: [
          /「更多的侵犯我吧～！啊～咿～啊啊～啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2795',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2796',
        any: [
          /「咿啊～啊啊～啊啊啊…已经…不行了…%SELF_CALL\(TARGET\)%已经快不行了～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2797',
        any: [
          /「要变成被侵犯屁股眼也会感到愉悦的淫乱女孩子了～…已经…已经要不行了啊～～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2798-2799',
        any: [
          /「啊啊～…主人～…屁股眼～！请更多更多地侵犯吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2800',
        any: [
          /「咿～…还差一点、还差一点～…要去了…去了啊～～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2803-2804',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2805',
        any: [/\t\t\tCFLAG:327 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2807',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2809',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2810',
        any: [
          /「啊啊～…主人～…请更多的侵犯我的屁股眼吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2811',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门将鸡鸡连根吞下、%SAVESTR:TARGET%好像很舒服的扭着身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2812-2813',
        any: [
          /「啊啊～…主人～…请更多的侵犯我的屁股眼吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2814',
        any: [
          /「咿～…还差一点、还差一点～…要去了…去了啊～～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2816',
        any: [/\t\t\tCFLAG:327 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2818',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2819',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2820',
        any: [/「啊啊～…插到里面来啦～…啊～啊啊～…哈啊啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2821',
        any: [
          /「明明…明明不可以这样的…屁股…感觉太刺激啦…啊～啊啊～啊啊啊%UNICODE\(0x2665\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2822-2823',
        any: [/「啊啊～…屁眼太有感觉了…对不起～～对不起～咿～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2824',
        any: [/「不过～不过～…实在是忍不住了啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2827-2828',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2829',
        any: [/\t\t\tCFLAG:327 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2831',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2832',
        any: [
          /「啊～啊啊啊啊～…被撑开了…被撑开了啊～～～…屁股眼…变成色情的洞洞了啊～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2834-2835',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2836',
        any: [/\t\t\tCFLAG:327 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2838',
        any: [/\t\tELSEIF ABL:3 >= 3 && \(CFLAG:327 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2839',
        any: [
          /「啊～啊啊～哈啊～～…不行～…不能再这样下去了～…人会…会变得奇怪的～…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2841-2842',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2843',
        any: [/\t\t\tCFLAG:327 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2845',
        any: [/\t\tELSEIF  CFLAG:327 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2846',
        any: [/「啊啊～…这样…这样是不对的…求求你…不要再这样了…呀呜～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2848-2849',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2850',
        any: [/\t\t\tCFLAG:327 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2859',
        any: [/IF\ SELECTCOM\ ==\ 27/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2859-2968',
        any: [/^IF SELECTCOM == 27$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2870',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2896',
        any: [/ELSEif RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2911',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:328 <= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2919',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2940',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2947',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2958',
        any: [/ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2859',
        any: [/IF SELECTCOM == 27/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2861',
        any: [/\tIF CFLAG:TARGET:328 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2863',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2864',
        any: [
          /「啊啊～…这样子…做着禽兽也不会做的事情…好美妙～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2865',
        any: [
          /%SAVESTR:TARGET%的肛门由于对被侵犯的期待感而下流的敞开了、吞下了%SAVESTR:PLAYER%的大鸡鸡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2867',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2867-2868',
        any: [
          /%SAVESTR:TARGET%開発过的肛门、将从后面插进来的鸡鸡全部吞下、带给了鸡鸡迷醉不已的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2871',
        any: [/「啊啊～…那、那里不是能插的地…嗯～…咕嗯～…咿～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2872',
        any: [
          /嘴上说不要身体却很老实的%SAVESTR:TARGET%用肛门将鸡鸡吞了下去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2874',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2874-2875',
        any: [
          /%SAVESTR:TARGET%開発过的肛门、将从后面插进来的鸡鸡全部吞下、带给了鸡鸡一阵阵的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2877-2878',
        any: [/「不、不要～…住手～…咿～咿～～～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2879',
        any: [
          /一边按住想逃走的%SAVESTR:TARGET%、一边侵犯着%SAVESTR:PLAYER%的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2881',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2881-2882',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门每次被鸡鸡一抽送、%SAVESTR:TARGET%就会发出悲鳴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2884-2885',
        any: [/\t\tCFLAG:TARGET:328 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2887-2889',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2890',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2891',
        any: [/「哈啊～～…啊啊～啊啊～哈啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2892',
        any: [
          /「更多的…侵犯屁股眼吧…疯狂的侵犯我吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2894',
        any: [/\t\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2894-2895',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被調教出了快感、将从后面插进来的鸡鸡连根吞下、%SAVESTR:TARGET%发出了淫乱的呻吟声…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2897',
        any: [
          /「啊啊啊啊…屁股眼被撑开了～～…屁股眼记住主人的大鸡鸡的形状了～～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2898',
        any: [
          /「啊～咿～～…不行…这…样～…！太…激…烈…了～！不～～行～～！要…不…行了～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2900',
        any: [/\t\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2900-2901',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被調教出了快感、不断地被鸡鸡从后面抽送着、%SAVESTR:TARGET%发出了淫荡的呻吟声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2902-2903',
        any: [
          /「哈～啊啊～啊～啊…啊啊～…不行了…再这样下去的话要不行了…真的…要变的除了屁股其他什么事情都不想了啊～～～…%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2904',
        any: [/「啊～啊～啊啊啊～…哈啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2906',
        any: [/\t\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2906-2907',
        any: [
          /%SAVESTR:TARGET%被開発过的鈍感肛门变成了分泌快楽的器官、每次被鸡鸡抽送、就会给%SAVESTR:TARGET%带来源源不绝的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2909',
        any: [/\t\t\tCFLAG:328 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2912',
        any: [
          /「哈～啊啊～啊～啊…啊啊～…不行了…再这样下去的话要不行了…真的…要变的除了屁股其他什么事情都不想了啊～～～…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2913',
        any: [/「啊～啊～啊啊啊～…哈啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2915',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2915-2916',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门一将鸡鸡连根吞下、%SAVESTR:TARGET%就尖叫起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2917',
        any: [/\t\t\tCFLAG:328 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2921',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2922',
        any: [/\t\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2923',
        any: [
          /「啊～啊啊啊～…明明被用这么羞耻的姿势…抽插着屁股眼…但是好爽…好爽啊啊～～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2924',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発得觉醒了快感、每次被鸡鸡抽送、%SAVESTR:TARGET%就会娇喘出声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2925-2926',
        any: [
          /「咿啊啊～…啊啊～嗯～…不行了…要不行了…爽过头了…啊～啊啊～啊啊啊啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2927',
        any: [
          /%SAVESTR:TARGET%被開発过的鈍感肛门变成了分泌快楽的器官、每次被鸡鸡抽送、就会给%SAVESTR:TARGET%带来源源不绝的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2929-2930',
        any: [/\t\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2931',
        any: [
          /「啊～啊啊啊～…明明被用这么羞耻的姿势…抽插着屁股眼…但是好爽…好爽啊啊～～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2932',
        any: [
          /%SAVESTR:TARGET%被調教过的肛门很轻松地吞下了%SAVESTR:PLAYER%的大鸡鸡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2933-2934',
        any: [
          /「咿啊啊～…啊啊～嗯～…不行了…要不行了…爽过头了…啊～啊啊～啊啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2935',
        any: [/%SAVESTR:TARGET%被从后面侵犯着調教过的肛门、娇喘出声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2938',
        any: [/\t\t\tCFLAG:328 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2941',
        any: [/「啊～啊啊啊啊…插到里面来～…嗯～…好…好棒哦…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2943',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2943-2944',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门每次被鸡鸡一抽送、%SAVESTR:TARGET%就尖叫起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2945',
        any: [/\t\t\tCFLAG:328 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2949',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2950',
        any: [
          /「明明讨厌…这样的姿势…啊呜嗯～…啊啊～但是好舒服哦…小屁屁快不行了～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2951',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発得觉醒了快感、每次被鸡鸡抽送、%SAVESTR:TARGET%就会娇喘出声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2952-2953',
        any: [
          /「明明讨厌…这样的姿势…啊呜嗯～…啊啊～但是好舒服哦…小屁屁快不行了～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2954',
        any: [
          /%SAVESTR:TARGET%的肛门通过調教变的能产生快感了、嘴里发出了甜蜜的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2956',
        any: [/\t\t\tCFLAG:328 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2959',
        any: [/「啊啊～…呀～…好难受呀…好难受啊…啊啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2960',
        any: [/一边按住想逃走的%SAVESTR:TARGET%一边侵犯着肛门………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2962',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2962-2963',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门每次被鸡鸡一抽送、%SAVESTR:TARGET%就会发出悲鳴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2964',
        any: [/\t\t\tCFLAG:328 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2973',
        any: [/IF\ SELECTCOM\ ==\ 28/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2973-3074',
        any: [/^IF SELECTCOM == 28$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2973',
        any: [/IF SELECTCOM == 28/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2975',
        any: [/\tIF CFLAG:TARGET:329 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2977',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2978',
        any: [
          /「啊啊～…屁眼变的好舒服啊…额呵呵、%SELF_CALL\(TARGET\)%也很舒服哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2980-2981',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2983',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2984',
        any: [
          /「啊～啊啊～…被用这种姿势…插进…屁眼…里面去了…啊～～…%SELF_CALL\(TARGET\)%…已经完全混乱了…能好好抱我吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2986-2987',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2989-2990',
        any: [/「啊啊～…插进…里面去了～…屁股眼变的奇怪了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2992-2993',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2995-2996',
        any: [/\t\tCFLAG:TARGET:329 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '2998-3000',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3001',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3002',
        any: [/「啊啊～…啊～啊～～！用力插啊～～～！%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3003',
        any: [
          /「咿啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3005',
        any: [/\t\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3006',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被調教出了快感、一将鸡鸡连根吞下、%SAVESTR:TARGET%就抱住%SAVESTR:PLAY/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3007-3008',
        any: [
          /%SAVESTR:TARGET%每次被从下方抽插肛门就会用力抱住%SAVESTR:PLAYER%在耳边发出娇喘………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3010',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3011',
        any: [
          /「呜啊～啊啊～…啊啊～！喜欢肛交～好喜欢～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3012',
        any: [/「啊啊～…更多的…更多的欺负我吧～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3014-3015',
        any: [/\t\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3016-3017',
        any: [
          /「呀啊啊～…好爽啊～～～～～屁股的…洞…好…爽…好…爽啊～～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3018',
        any: [
          /「更多的…欺负欺负我吧～…除了大肉棒已经什么都不想了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3020-3021',
        any: [/\t\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3023',
        any: [/\t\t\tCFLAG:329 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3025',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:329 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3027',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3028',
        any: [
          /「啊啊～…啊～啊～～！再插…再用力插啊～！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3029',
        any: [
          /「呀啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3030',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门一将%SAVESTR:PLAYER%的鸡鸡连根吞下、%SAVESTR:TARGET%就抱住%SAV/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3031-3032',
        any: [/「啊啊～…啊～啊～～！用力插啊～！%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3033',
        any: [
          /「呀啊啊～啊～…呀～啊啊啊～～！屁股眼被撑开了～…变的奇怪了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3034',
        any: [/%SAVESTR:TARGET%每次被从下方抽插肛门就会发出娇喘声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3036',
        any: [/\t\t\tCFLAG:329 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3038',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3039',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3040',
        any: [/「啊啊～…啊～…更加…激烈一点吧～～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3041',
        any: [
          /「这个尻穴…已经变成…主人的専用物了…啊～咿呀啊～啊啊～！更多的爱我吧～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3042-3043',
        any: [
          /「嗯咿～…啊～啊啊啊～…明明…这么被这么粗暴地对待…但是好舒服啊～～…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3044',
        any: [
          /「想永远被主人爱着～…啊～啊啊～哈啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3047-3048',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3049',
        any: [/\t\t\tCFLAG:329 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3051',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3052',
        any: [/「啊～…啊啊～…请再继续…动起来吧…好喜欢这样…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3054-3055',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3056',
        any: [/\t\t\tCFLAG:329 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3058',
        any: [/\t\tELSEIF ABL:3 >= 3 && \(CFLAG:329 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3059',
        any: [
          /「啊啊～…啊…啊～～…咕呜呜呜～…要变成…%SELF_CALL\(TARGET\)%的玩具了～…啊～～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3061-3062',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3063',
        any: [/\t\t\tCFLAG:329 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3065',
        any: [/\t\tELSEIF  CFLAG:329 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3066',
        any: [/「啊啊～…不要～…好难受…再这样下去…真的…啊啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3068-3069',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3070',
        any: [/\t\t\tCFLAG:329 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3079',
        any: [/IF\ SELECTCOM\ ==\ 29/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3079-3189',
        any: [/^IF SELECTCOM == 29$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3079',
        any: [/IF SELECTCOM == 29/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3081',
        any: [/\tIF CFLAG:TARGET:330 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3083',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3084',
        any: [/「啊呜唔呜～！…屁股眼被侵犯了好爽好爽啊～～～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3085',
        any: [
          /「再用力点…抱我…请尽情侵犯我的屁眼吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3087-3088',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3090',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3091',
        any: [/「啊啊呜～…明明难得的被从背后温柔地抱住…嗯～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3092',
        any: [
          /「被用这种姿势插进尻穴什么的…啊～…啊～…哈啊啊…啊～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3094-3095',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3097-3098',
        any: [/「呜、咕、啊啊啊…撑开了…被撑开了～…屁眼被撑开了～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3100',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3101',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门一将鸡鸡连根吞下、%SAVESTR:TARGET%就发出了悲鳴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3102-3103',
        any: [/%SAVESTR:TARGET%被从下方抽插着肛门、痛苦地呻吟着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3106-3107',
        any: [/\t\tCFLAG:TARGET:330 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3109-3111',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3112',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3113',
        any: [
          /「咿呀啊啊～…屁股眼好舒服～好舒服啊～…啊啊啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3114',
        any: [
          /「屁股眼～…不行了…已、已经…爽得什么事都不想去想了～…咿呜～啊啊～啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3116',
        any: [/\t\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3117',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被調教出了快感、将鸡鸡连根吞下、%SAVESTR:TARGET%发出了淫乱的呻吟声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3118-3119',
        any: [/%SAVESTR:TARGET%嘴边流着口水沉浸在肛门的快感之中………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3121-3122',
        any: [
          /「嗯咿咿～～～！不行～～不行～～～…不要随便动屁股啊～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3123',
        any: [
          /「真是的…只欺负屁股眼～…屁股眼变的好爽啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3125',
        any: [/\t\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3126',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被調教出了快感、贪婪的连根吞下了鸡鸡、%SAVESTR:TARGET%像磨盘似的扭着腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3127-3128',
        any: [
          /%SAVESTR:TARGET%淫猥地揺着腰身、一边不断地收缩肛门一边品味着%SAVESTR:PLAYER%的鸡鸡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3131',
        any: [/\t\t\tCFLAG:330 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3133',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:330 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3134',
        any: [
          /「嗯咿咿～～～！不行～～不行～～～…不要随便动屁股啊～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3135',
        any: [
          /「真是的…只欺负屁股眼～…屁股眼变的好爽啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3137',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3138',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门将%SAVESTR:PLAYER%的鸡鸡连根吞下、%SAVESTR:TARGET%愉悦的像磨盘似的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3139-3140',
        any: [/%SAVESTR:TARGET%淫猥地揺着腰身品味着你的鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3142',
        any: [/\t\t\tCFLAG:330 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3144',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3145',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3146',
        any: [
          /「啊啊啊～…虽然是这种姿势…尻穴也好有感觉啊…啊～啊啊～…啊咕呜～…再来…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3147',
        any: [/「再…再来啊～！…请…更多…更多的！欺…欺负～…屁股…眼儿吧～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3149-3150',
        any: [/\t\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3151-3152',
        any: [/「咕咿～…自从知道…屁股眼儿…能这么舒服之后～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3153',
        any: [
          /「已经…没办法…没办法…再舍弃这种滋味了～…嗯～嗯啊啊～哈啊～～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3155',
        any: [/\t\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3156',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発得觉醒了快感、一将鸡鸡连根吞下、%SAVESTR:TARGET%就由于肛门的快楽而陶醉了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3157-3158',
        any: [
          /沉醉于肛门的快楽之中的%SAVESTR:TARGET%已经完全找不到身为聖女时的样貌了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3161',
        any: [/\t\t\tCFLAG:330 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3163',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3164',
        any: [/「哈啊……啊啊～啊～～…被这样欺负屁股眼、也…好舒服…啊～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3166-3167',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3168',
        any: [/\t\t\tCFLAG:330 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3170',
        any: [/\t\tELSEIF ABL:3 >= 3 && \(CFLAG:330 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3171',
        any: [/「啊～咿啊～…啊啊～～…屁股眼…竟然…这么的舒服…咿～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3173-3174',
        any: [/\t\t\tSIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3175',
        any: [/\t\t\tCFLAG:330 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3177',
        any: [/\t\tELSEIF  CFLAG:330 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3178',
        any: [/「哈啊…啊啊～…咕呜～…咕…呜呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3180',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3181',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门一将鸡鸡连根吞下、%SAVESTR:TARGET%就发出了悲鳴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3182-3183',
        any: [/%SAVESTR:TARGET%被从下方抽插着肛门、痛苦的呻吟着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3185',
        any: [/\t\t\tCFLAG:330 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3194',
        any: [/IF\ SELECTCOM\ ==\ 30/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3194-3288',
        any: [/^IF SELECTCOM == 30$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3194',
        any: [/IF SELECTCOM == 30/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3196',
        any: [/\tIF CFLAG:TARGET:331 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3198',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3199',
        any: [
          /「额呵呵…这样一上一下地…玩弄大肉棒真不错呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3201',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3202',
        any: [/「啊哈啊啊…能摸到主人的大鸡鸡…真不错呢…我一定会努力奉仕的～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3204',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3205',
        any: [/「哈啊…哈啊…大鸡鸡…好烫…好厉害哦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3207-3208',
        any: [/「讨、讨厌…这东西…咿呀～…好烫………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3210-3211',
        any: [/\t\tCFLAG:TARGET:331 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3213-3215',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3216',
        any: [/\t\t\tIF TALENT:PLAYER:318 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3218',
        any: [/「好雄伟的肉棒…两只手都抓不住%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3219',
        any: [/\t\t\tELSEIF TALENT:PLAYER:318 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3221',
        any: [
          /「小孩子似的鲜肉棒，很有活力地勃起着呢%UNICODE\(0x2661\) \*1%　好可爱%UNICODE\(0x2661\) \*1%　想咻咻地射出/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3222',
        any: [/\t\t\tELSEIF TALENT:PLAYER:318 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3224',
        any: [
          /「啊……%UNICODE\(0x2661\) \*1%　包茎肉棒，剥开就满是雄性的味道……好高兴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3225',
        any: [/\t\t\tELSEIF TALENT:PLAYER:318 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3227',
        any: [
          /「马肉棒好厉害……%UNICODE\(0x2661\) \*1%　脑袋要变得奇怪了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3229',
        any: [/\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3230',
        any: [
          /「啊啊～…单是摸到大肉棒就已经按捺不住了～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3231',
        any: [
          /「当、当然让我奉仕大肉棒一整天也是能做到的、不过…啊啊～不要让大肉棒这么興奮嘛%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3232-3233',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3234-3235',
        any: [
          /「啊啊啊啊…大肉棒～…好高兴…可以的话就请射精吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3236',
        any: [
          /%SELF_CALL\(TARGET\)%像打心眼里喜欢似的、慈爱地用手不断撸着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3237',
        any: [
          /「全部…全部都是%SELF_CALL\(TARGET\)%的哦～…啊啊啊…大肉棒好棒～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3238-3239',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3241',
        any: [/\t\t\tCFLAG:331 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3243',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3244',
        any: [/\t\t\tIF TALENT:PLAYER:318 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3246',
        any: [/「好雄伟的棒棒…两只手都抓不住%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3247',
        any: [/\t\t\tELSEIF TALENT:PLAYER:318 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3249',
        any: [
          /「小孩子似的鲜肉棒棒，很有活力地勃起着呢%UNICODE\(0x2661\) \*1%　好可爱%UNICODE\(0x2661\) \*1%　想咻咻地射/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3250',
        any: [/\t\t\tELSEIF TALENT:PLAYER:318 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3252',
        any: [
          /「啊……%UNICODE\(0x2661\) \*1%　包茎棒棒，剥开就满是雄性的味道……好高兴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3253',
        any: [/\t\t\tELSEIF TALENT:PLAYER:318 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3255',
        any: [
          /「马棒棒好厉害……%UNICODE\(0x2661\) \*1%　脑袋要变得奇怪了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3257',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3258',
        any: [
          /「啊啊…明明只是用手摸到…又硬又烫的大鸡鸡…就总觉…%SELF_CALL\(TARGET\)%也…嗯嗯～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3259',
        any: [/曾经慈爱地给人们带来治愈的这双手、现在只是为了撸鸡鸡而存在。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3260',
        any: [/「啊～…感、感觉怎样…会舒服吗？………好的～！会让您更舒服的～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3261-3262',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3263-3264',
        any: [/「啊啊啊…只是摸了摸大鸡鸡…好像就興奮起来了呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3265',
        any: [
          /%SELF_CALL\(TARGET\)%像打心眼里喜欢似的、慈爱地用手不断撸着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3266',
        any: [
          /「能让%SELF_CALL\(TARGET\)%做这么色情的事情的只有主人哦～………啊…啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3267-3268',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3270',
        any: [/\t\t\tCFLAG:331 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3272',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3273',
        any: [/「额呵呵…大鸡鸡对我”服服帖帖”的呢～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3274-3275',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3276',
        any: [/\t\t\tCFLAG:331 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3278',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3279',
        any: [/「总觉得…能分辨出能让大鸡鸡感到舒服的地方了呢…啊～～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3280',
        any: [/\t\t\tCFLAG:331 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3282',
        any: [/\t\tELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3283',
        any: [/「哈啊哈啊…呀啊啊…大鸡鸡…变的…这么硬了…感觉好怪…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3284',
        any: [/\t\t\tCFLAG:331 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3293',
        any: [/IF\ SELECTCOM\ ==\ 31/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3293-3376',
        any: [/^IF SELECTCOM == 31$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3293',
        any: [/IF SELECTCOM == 31/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3295',
        any: [/\tIF CFLAG:TARGET:332 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3297',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3298',
        any: [
          /「啊啊～…能奉仕大肉棒～…好开心啊…嗯啾～啾～嘞噗～…嘞咯～…噗呼呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3300',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3301',
        any: [
          /「哈啊啊…能尽情的吮吸了呢…嗯噗～…嗯啊…哈姆呜…啾～啾呜唔…嘞咯～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3303',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3304',
        any: [/「好、好的…会、努力奉仕的…哈姆呜…啾～啾噗…嘞咯～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3306-3307',
        any: [/「用、用嘴奉仕吗…知、知道了…啊啊嗯…哈姆…嗯啾…啾…呜啊…好咸………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3309-3310',
        any: [/\t\tCFLAG:TARGET:332 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3312-3314',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3315',
        any: [/\t\t\t\tIF TALENT:PLAYER:318 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3317',
        any: [/「啊，雄伟的肉棒……我开动了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3318',
        any: [/\t\t\t\tELSEIF TALENT:PLAYER:318 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3320',
        any: [
          /「小孩子似的鲜肉棒啊，努力地勃起着呢%UNICODE\(0x2661\) \*1%　真可爱%UNICODE\(0x2661\) \*1%　这就好好给你…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3321',
        any: [/\t\t\t\tELSEIF TALENT:PLAYER:318 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3323',
        any: [
          /「满是男人味包皮肉棒啊……心跳加速了呢%UNICODE\(0x2661\) \*1%　我开动咯……哈呣%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3324',
        any: [/\t\t\t\tELSEIF TALENT:PLAYER:318 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3326',
        any: [
          /「巨大的马肉棒……下巴可得脱臼了吧%UNICODE\(0x2661\) \*1%　我开动咯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3328',
        any: [
          /「嗯姆啾呜…哈啊…哈啊…大肉棒…美味…好美味啊…啊～～…呗咯～…啾～啾呜唔呜唔%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3329',
        any: [
          /「嘴巴要融化了～…嗯噗～…啾啪啊～…嘞噗～啾～啾呜呜～啾呜唔%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3330-3331',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3332',
        any: [/%SAVESTR:TARGET%把精液吞进喉咙深处、享受着口交奉仕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3333',
        any: [/\t\t\tCFLAG:332 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3335',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3336',
        any: [
          /「啊啊～…喜欢大肉棒…好喜欢大肉棒啊…请让我更多…更多的侍奉它吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3337',
        any: [
          /%SAVESTR:TARGET%单是口交就已经把持不住的样子、一边摩擦着合并起来的双腿一边奉仕着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3338-3339',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3340',
        any: [/\t\t\tCFLAG:332 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3342',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3343',
        any: [/\t\t\t\tIF TALENT:PLAYER:318 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3345',
        any: [/「啊…雄伟的棒棒…被迷倒了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3346',
        any: [/\t\t\t\tELSEIF TALENT:PLAYER:318 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3348',
        any: [
          /「小孩子似的鲜肉棒棒，努力地勃起着呢%UNICODE\(0x2661\) \*1%　真可爱%UNICODE\(0x2661\) \*1%　这就好好给你…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3349',
        any: [/\t\t\t\tELSEIF TALENT:PLAYER:318 == 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3351',
        any: [
          /「满是男人味包皮棒棒……心跳加速了呢%UNICODE\(0x2661\) \*1%　我开动咯……哈呣%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3352',
        any: [/\t\t\t\tELSEIF TALENT:PLAYER:318 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3354',
        any: [
          /「巨大的马棒棒……下巴可得脱臼了吧%UNICODE\(0x2661\) \*1%　我开动咯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3356',
        any: [
          /「啊啊…%SELF_CALL\(TARGET\)%的嘴…是为了这样侍奉大鸡鸡而存在的～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3357',
        any: [/「啊啊…已经完全含住了…所以请不用顾虑地把精液射进嘴里吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3358',
        any: [/%SAVESTR:TARGET%带着喜悦的表情继续着口交奉仕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3359-3360',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3361',
        any: [/\t\t\tCFLAG:332 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3363',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3364',
        any: [
          /「嗯咕～…嗯啾…嘞噗～…呼啊…哈啊哈啊…不让我再吮我可不会满足哦？…额呵呵～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3365',
        any: [/%SAVESTR:TARGET%用舌头舔了舔嘴唇之后、再次用舌头舔起了阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3366-3367',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3368',
        any: [/\t\t\tCFLAG:332 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3370',
        any: [/\t\tELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3371',
        any: [/「啊姆呜…嗯～…呗咯～…嗯呜唔…这样…含着…嗯～！嗯～！嗯嗯呜唔！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3372',
        any: [/\t\t\tCFLAG:332 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3381',
        any: [/IF\ SELECTCOM\ ==\ 32/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3381-3456',
        any: [/^IF SELECTCOM == 32$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3381',
        any: [/IF SELECTCOM == 32/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3383',
        any: [/\tIF CFLAG:TARGET:333 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3385',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3386',
        any: [
          /「额呵呵～…用乳房做舒服吗%UNICODE\(0x2661\) \*1%　请尽情的射精吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3388',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3389',
        any: [
          /「啊啊…%SELF_CALL\(TARGET\)%的乳房是为了这样奉仕您而存在的呢…请变的更舒服吧～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3391',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3392',
        any: [/「嗯～…乳房还能这样用呢…额呵呵、比预想的更有趣呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3394-3395',
        any: [/「咕呜～…我、我的胸部…是给小宝宝哺乳用的啊…啊…哈啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3397-3398',
        any: [/\t\tCFLAG:TARGET:333 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3400-3402',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3403',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3404',
        any: [
          /「嗯～…啊～…哈啊～～…再继续侵犯我的乳房吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3405',
        any: [
          /「啊呜唔…要射精的话…请满满的射在乳房上吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3406-3407',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3408',
        any: [/%SAVESTR:TARGET%一边露出淫猥的笑容一边倾斜着乳房奉仕着鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3409-3410',
        any: [/「啊啊～…乳房被侵犯了～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3411',
        any: [
          /「尽情射精吧～…请把乳房浇满腥臭的精液吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3412-3413',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3414',
        any: [/%SAVESTR:TARGET%继续用豊満的両乳淫猥地进行奉仕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3416',
        any: [/\t\t\tCFLAG:333 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3418',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3419',
        any: [/「啊啊～…更多地侵犯乳房吧～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3420-3421',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3422-3423',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3424',
        any: [/\t\t\tCFLAG:333 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3426',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:333 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3427',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3428',
        any: [
          /「啊～…嗯～嗯呼呜…和主人一起做快乐的事、总觉得非常…开心呢…啊啊～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3429',
        any: [
          /「哈啊啊～…%SELF_CALL\(TARGET\)%也…觉得乳房…好舒服呢…啊～…还要…我还要再奉仕～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3430',
        any: [/%SAVESTR:TARGET%开心的眯起眼沉浸在奉仕中………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3431-3432',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3433-3434',
        any: [
          /「啊啊…请更多的…更多的把%SELF_CALL\(TARGET\)%的乳房…当玩具用吧～………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3435',
        any: [
          /「啊～咿～…啊～啊啊啊～…哈啊啊啊…乳房…好舒服…多摩擦大鸡鸡一下吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3436',
        any: [/%SAVESTR:TARGET%一边露出聖女般的笑容一边继续着淫靡的奉仕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3437-3438',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3440',
        any: [/\t\t\tCFLAG:333 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3442',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:333 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3443',
        any: [/「哈啊～…啊～啊～～…讨、讨厌…明明只是用乳房摩擦大鸡鸡而已………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3444',
        any: [/「为什么…会这么爽呢…啊啊～…更多…更多的摩擦吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3445',
        any: [/%SAVESTR:TARGET%开心的眯起眼沉浸在奉仕中………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3446-3447',
        any: [/\t\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3448',
        any: [/\t\t\tCFLAG:333 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3450',
        any: [/\t\tELSEIF  CFLAG:333 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3451',
        any: [/「哈啊…啊啊…感、感觉怎样…会舒服…吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3452',
        any: [/\t\t\tCFLAG:333 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3461',
        any: [/IF\ SELECTCOM\ ==\ 33/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3461-3506',
        any: [/^IF SELECTCOM == 33$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3461',
        any: [/IF SELECTCOM == 33/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3463',
        any: [/\tIF CFLAG:TARGET:334 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3465',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3466',
        any: [/「额呵呵～…这就是所谓的”素股”吧…啊啊…大鸡鸡好烫啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3468',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3469',
        any: [
          /「大鸡鸡不用插进来吗…？诶、只要舒服就行？啊…嗯～…啊哈啊%UNICODE\(0x2665\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3471-3472',
        any: [/「啊啊～…不、不能不做这样的事吗…啊～…啊～～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3474-3475',
        any: [/\t\tCFLAG:TARGET:334 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3477-3479',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3480',
        any: [
          /「啊啊～啊～哈啊啊啊…嗯呼呜…呐、主人～…要是肉棒…就这样…插进%SELF_CALL\(TARGET\)%的小穴里去了该怎么办呢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3481',
        any: [
          /「…额呵呵～…没关系哦…%SELF_CALL\(TARGET\)%的贞洁该怎么处置…就全交由主人判断啦…呵呵…额呵呵%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3482',
        any: [/\t\t\tCFLAG:334 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3484',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:334 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3485',
        any: [/「啊啊～～…不要挑逗人家嘛…求你了～…%UNICODE\(0x2665\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3486',
        any: [
          /「明明好想要…大肉棒啊…啊啊～…啊～…啊～～…把人家弄得不上不下的…要疯了～%UNICODE\(0x2665\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3487',
        any: [/\t\t\tCFLAG:334 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3489',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3490',
        any: [/「啊～…嗯呜唔～…哈啊啊～…那、那个…主人…总觉得…好难受啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3491',
        any: [/「咕呜嗯～…啊啊～…哈啊啊～…大鸡鸡…都这么烫了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3492',
        any: [/%SAVESTR:TARGET%现在有点神情沮丧地继续做着素股………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3493',
        any: [/\t\t\tCFLAG:334 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3495',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3496',
        any: [/「啊啊～…鸡鸡好烫…啊啊～…真的…好想被插进来呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3497',
        any: [/「是、是～、我知道了～…会努力奉仕的哦………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3498',
        any: [/\t\t\tCFLAG:334 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3500',
        any: [/\t\tELSEIF CFLAG:334 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3501',
        any: [/「啊呜～…大鸡鸡…好烫…感觉变得好奇怪啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3502',
        any: [/\t\t\tCFLAG:334 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3511',
        any: [/IF\ SELECTCOM\ ==\ 34/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3511-3793',
        any: [/^IF SELECTCOM == 34$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3511',
        any: [/IF SELECTCOM == 34/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3513',
        any: [/\tIF CFLAG:TARGET:335 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3515',
        any: [/\t\tIF TALENT:0 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3517',
        any: [/\t\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3518',
        any: [
          /「啊啊啊…主人～…%SELF_CALL\(TARGET\)%的处女…请收下吧%UNICODE\(0x2661\) \*1%……额呵呵、总觉得心跳不已呢/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3519',
        any: [
          /「哈呜～…咕…啊啊…就这样插进去…啊啊～啊～、啊啊啊啊啊啊啊～～！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3520',
        any: [/%SAVESTR:TARGET%自己沉下腰把处女献了出来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3521',
        any: [
          /「哈啊…哈啊…啊啊啊…主人的大肉棒…进到里面去了～…啊～啊啊～啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3523',
        any: [/\t\t\t\t\tIF TALENT:TARGET:317 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3524',
        any: [
          /%SAVESTR:TARGET%开心的笑了并为了战胜破瓜的疼痛开始慢慢地动起了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3525',
        any: [
          /「大肉棒…大肉棒…好棒～…这样子的话…已经什么也不用在意了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3526',
        any: [
          /随着腰身的上下运动%SAVESTR:TARGET%脑海中故郷恋人的事情像被橡皮擦擦去一般的消失了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3527',
        any: [/已经连他的脸和表情都想不起来了吧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3528-3529',
        any: [
          /%SAVESTR:TARGET%开心的笑了并为了战胜破瓜的疼痛开始慢慢地动起了腰。…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3532',
        any: [/\t\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3533',
        any: [/「嗯、真是的…要让我自己…插进去吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3534',
        any: [
          /「好吧…%SELF_CALL\(TARGET\)%的处女…请收下吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3535',
        any: [
          /「这可是…一直珍惜着的东西呢…啊～～…哈～…呜～…咕呜呜呜～…嗯～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3537',
        any: [/\t\t\t\t\tIF TALENT:TARGET:317 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3538',
        any: [
          /（啊啊…%SELF_CALL\(TARGET\)%从现在起…为了你…而生～…%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3539',
        any: [
          /是想起了故郷的恋人了吗、%SAVESTR:TARGET%的眼角流下了一滴眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3540-3541',
        any: [/%SAVESTR:TARGET%的眼角流下了一滴眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3544-3545',
        any: [/「啊啊～…要这样…自己插进去吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3546',
        any: [/「啊呜呜～…不、不要…抓着…腰…咿咿咿～～！啊～啊啊啊啊！」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3548',
        any: [/\t\t\t\t\tIF TALENT:TARGET:317 == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3549',
        any: [
          /（我、%SELF_CALL\(TARGET\)%…已经…回不了故郷了…再也回不去了………呜！）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3550',
        any: [/是想起了故郷的恋人了吗、%SAVESTR:TARGET%的双眼泪流不止………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3551-3552',
        any: [/%SAVESTR:TARGET%的双眼泪流不止………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3556-3558',
        any: [/\t\t\tIF TALENT:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3559',
        any: [
          /「啊啊…插进去的地方～…全部被看到了…嗯～嗯呼呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3560',
        any: [/「啊啊啊…被看着好有感觉啊～～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3562-3563',
        any: [/\t\t\t\tSIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3565',
        any: [/\t\t\tELSEIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3566',
        any: [/「骑在主人身上…啊啊、总觉得好淫荡啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3567',
        any: [
          /「啊～啊啊～…那么这样…插进去的地方…就全部被看光了呢…啊啊～啊啊啊～！」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3569-3570',
        any: [/\t\t\t\tSIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3572-3573',
        any: [/「咕呜呜～…进到…里面去了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3575',
        any: [/\t\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3576',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、被插入的異物感令%SAVESTR:TARGET%忍不住发出了痛苦的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3577-3578',
        any: [/%SAVESTR:TARGET%皱着眉头忍耐着異物感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3582-3583',
        any: [/\t\tCFLAG:TARGET:335 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3585-3587',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 8 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3588',
        any: [/\t\t\tIF RAND:4 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3589',
        any: [
          /「咿啊啊～…啊～啊啊啊啊…腰完全停不下来啊～～…大肉棒实在是太爽了～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3590',
        any: [/%SAVESTR:TARGET%淫猥地扭着腰、用整个阴道品味着阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3591',
        any: [
          /「把精液射进来吧…呐…求您了～…把%SELF_CALL\(TARGET\)%淫乱的小穴里～…用主人的精液到处打满记号吧～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3592-3593',
        any: [/\t\t\t\tSIF TALENT:TARGET:153 != 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3594',
        any: [/\t\t\tELSEIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3595',
        any: [
          /「请更多的…欺负我吧…%SELF_CALL\(TARGET\)%的淫乱小穴…已经湿成一片了～…让我变的更爽吧～%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3596',
        any: [
          /%SAVESTR:TARGET%好不容易集中起残存的理性却只是向%SAVESTR:PLAYER%提出了下流的要求。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3597',
        any: [
          /「尽情的…欺负～…小穴…黏糊糊湿答答的…已经…已经…忍不住了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3598',
        any: [
          /「啊～啊～…咿～…咕呜～…啊啊～…啊～…啊啊啊啊啊啊啊啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3599',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3600',
        any: [
          /「明明觉得…不能再这样下去了…啊～…啊～～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3601',
        any: [
          /「淫乱的小穴…一被弄得黏糊糊的…就忍不住了～…%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3602',
        any: [
          /「好像做梦一样…被侵犯…被侵犯…要变得奇怪了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3603',
        any: [/%SAVESTR:TARGET%为了贪求快乐扭动着腰身………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3604-3605',
        any: [
          /「啊啊～啊啊…啊呼呜～…啊～啊啊啊～…更多的…黏糊糊地插进来吧！把我弄坏吧～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3606',
        any: [
          /「啊啊、这样子…紧紧黏在一起…要变成主人専用的阴茎容器了～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3607',
        any: [/%SAVESTR:TARGET%一脸陶醉地收紧着阴道口………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3609',
        any: [/\t\t\tCFLAG:335 = 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3611',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 7 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3612',
        any: [/\t\t\tIF RAND:4 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3613',
        any: [/%SAVESTR:TARGET%把阴茎放进阴道深处、发出了轻轻的呻吟。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3614',
        any: [/「咕啊啊――――――啊～…哈啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3615',
        any: [
          /「稍微…高潮了一下呢…让%SELF_CALL\(TARGET\)%变的、这么不知羞耻…你可要…负起责任…呢…啊～～%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3616',
        any: [/\t\t\tELSEIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3617',
        any: [
          /「啊～嗯～…嗯啊啊～…啊～～…被这样抽插着…要不行了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3618',
        any: [
          /%SAVESTR:TARGET%被调教的即使被毫不留情的抽插、也能通过阴道里的刺激得到快感的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3619',
        any: [
          /%SAVESTR:TARGET%已经完全将沉浸在与%SAVESTR:PLAYER%的快楽之中作为活下去的理由的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3620',
        any: [
          /「马上就要去了…所以先别射哦…请让我变得更舒服吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3621',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3622',
        any: [
          /「啊啊…主人～…喜欢你～%UNICODE\(0x2661\) \*1% 好喜欢你啊%UNICODE\(0x2661\) \*1% 所以再多操我的小穴吧%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3623',
        any: [/%SAVESTR:TARGET%沉溺在強烈的快楽中、半苦半叫地扭动着腰/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3624',
        any: [
          /「已经不能…没有这个了…不能…即使一天不做也忍不下去了啊…啊啊～…还想要～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3625-3626',
        any: [/「啊～…唔嗯～…嗯～嗯嗯～♪…嗯呼呜～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3627',
        any: [
          /「主人的精液…%SELF_CALL\(TARGET\)%全部…收下了呢…啊啊～啊～啊哈啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3628',
        any: [/%SAVESTR:TARGET%在%SAVESTR:PLAYER%的身上扭动着腰娇喘不已………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3630',
        any: [/\t\t\tCFLAG:335 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3632',
        any: [
          /\t\tELSEIF TALENT:TARGET:75 == 1 && \(CFLAG:321 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3633',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3634',
        any: [
          /「啊啊～…明明是这么羞耻的姿势…但是好爽啊～！…啊啊～啊～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3635',
        any: [
          /%SAVESTR:TARGET%自己前后舂动着腰贪求着快楽、她的表情因为淫乱而扭曲、平常的清纯模样早已烟消云散。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3636',
        any: [
          /「大肉棒…真舒服～%UNICODE\(0x2661\) \*1% 好舒服啊～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3637',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3638',
        any: [/「大肉棒…全部插进去了～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3639',
        any: [
          /「明明既不是結婚对象…也不是恋人…啊啊～啊～…但是太舒服了实在没办法啊～…咿～啊呜啊啊啊～%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3640',
        any: [
          /抓住沉溺于快楽中的%SAVESTR:TARGET%的腰、每次往阴道里捅就会发出高亢的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3641-3642',
        any: [
          /「啊啊～…好深…好深啊…%UNICODE\(0x2661\) \*1% 小穴里面…完全被大肉棒侵占啦～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3643',
        any: [
          /%SAVESTR:TARGET%为了贪求%SAVESTR:PLAYER%的鸡鸡不断上下扭动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3644',
        any: [
          /「啊啊～%UNICODE\(0x2661\) \*1% 更多地…惩罚成为肉棒奴隷的%SELF_CALL\(TARGET\)%吧～%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3646',
        any: [/\t\t\tCFLAG:335 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3648',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3649',
        any: [/\t\t\tIF RAND:4 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3650',
        any: [
          /「咿啊啊～…啊～啊啊啊啊…腰完全停不下来啊～～…大肉棒实在是太爽了～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3652',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3653',
        any: [
          /%SAVESTR:TARGET%曾是聖女的一部分的鈍感私处被开发的感觉到了无穷的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3654',
        any: [
          /”淫乱”的%SAVESTR:TARGET%完全沉溺在了快楽之中、淫猥地摇晃着腰品味着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3656',
        any: [/\t\t\t\tELSEIF ABL:2 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3657',
        any: [/%SAVESTR:TARGET%淫猥地揺着腰身、品味着阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3659',
        any: [/\t\t\tELSEIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3660',
        any: [
          /「哈啊啊～…嗯呼呜%UNICODE\(0x2661\) \*1%　这样子插得好深啊～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3661',
        any: [
          /「紧密地%UNICODE\(0x2661\) \*1% 紧密地%UNICODE\(0x2661\) \*1% 扭着腰…好喜欢…嗯啊啊～～%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3663',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3664',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被調教出了快感、坦率的接受快感的%SAVESTR:TARGET%很愉快的前后扭着腰、身体一次又一次/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3666',
        any: [/\t\t\t\tELSEIF ABL:2 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3667',
        any: [
          /%SAVESTR:TARGET%每次扭动腰身、就会一颤一颤地痙攣起来、品味着快楽………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3669',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3670',
        any: [
          /「嗯呜唔～…啊啊～…啊～～…啊啊啊啊～…%SELF_CALL_FIRST\(TARGET\)%～%SELF_CALL\(TARGET\)%的淫乱小穴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3671',
        any: [
          /「不过～…腰…停不下来啊～…小穴太淫乱了真是对不起～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3672',
        any: [
          /「啊啊～…主人～%UNICODE\(0x2661\) \*1%　更多的…更多的欺负我吧～～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3674',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3675',
        any: [
          /%SAVESTR:TARGET%的私处已经被开发得忘记鈍感时候的感觉了、%SAVESTR:TARGET%带着陶醉的表情激烈的摇动着腰喘息不已/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3677',
        any: [/\t\t\t\tELSEIF ABL:2 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3678',
        any: [
          /%SAVESTR:TARGET%带着陶醉的表情、激烈的摇动着腰沉浸在快乐之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3680-3681',
        any: [/「嗯唔～…啊咿～…不要…不要…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3682',
        any: [
          /「啊～啊啊啊～…嗯～咕呜～…呜啊…已经…不行了…已经…除了小穴其他什么也不想嘞…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3684',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3685',
        any: [
          /%SAVESTR:TARGET%的私处已经被开发得忘记鈍感时候的感觉了、%SAVESTR:TARGET%嘴边耷拉着口水贪求着快乐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3687',
        any: [/\t\t\t\tELSEIF ABL:2 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3688',
        any: [/%SAVESTR:TARGET%嘴边耷拉着口水贪求着快乐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3691',
        any: [/\t\t\tCFLAG:335 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3693',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3694',
        any: [/\t\t\tIF RAND:4 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3695',
        any: [/「嗯～…啊、啊啊～…不用动也可以哦…能让主人舒服的话…就行～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3697',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3698',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、为了进一步品尝那种滋味%SAVESTR:TARGET%一边开心的笑着一边上下动/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3700',
        any: [/\t\t\t\tELSEIF ABL:2 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3701',
        any: [/%SAVESTR:TARGET%一边开心的笑着一边扭动着腰品味着快乐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3703',
        any: [/\t\t\tELSEIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3704',
        any: [/「啊～…嗯嗯～…啊～～…不行爽过头了～…忍不住了～…♪」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3706',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3707',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、自己将%SAVESTR:PLAYER%的阴茎连根吞下并发出了很带感的呻吟声……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3709',
        any: [/\t\t\t\tELSEIF ABL:2 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3710',
        any: [/%SAVESTR:TARGET%一把你的阴茎吞入体内就欢喜的颤抖不已………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3712',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3713',
        any: [/「喜欢…好喜欢主人的东西啊…啊啊～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3714',
        any: [
          /「这里…也希望主人能变的更舒服点呢…啊～啊啊～…哈唔呜～…让我…来奉仕您吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3716',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3717',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、尝到这种快楽的%SAVESTR:TARGET%淫笑着摇动着腰持续进行着仕奉……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3719',
        any: [/\t\t\t\tELSEIF ABL:2 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3720',
        any: [
          /%SAVESTR:TARGET%一边淫笑着、一边继续努力侍奉着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3722-3723',
        any: [/「啊～…唔嗯～…嗯呜唔呜…嗯呼呜～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3724',
        any: [/「啊啊～…这么的舒服…已经变的离不开它了…啊～啊啊～啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3726',
        any: [/\t\t\t\tIF ABL:2 >= 3 && TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3727',
        any: [
          /%SAVESTR:TARGET%鈍感的私处已经变成了产生快感的蜜壺、%SAVESTR:TARGET%神情陶醉的舂动着腰品味着快楽………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3729',
        any: [/\t\t\t\tELSEIF ABL:2 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3730',
        any: [/%SAVESTR:TARGET%陶醉地舂动着腰引诱着%SAVESTR:PLAYER%射精………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3733',
        any: [/\t\t\tCFLAG:335 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3735',
        any: [
          /\t\tELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3736',
        any: [/\t\t\tIF RAND:4 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3737',
        any: [/「啊～…嗯咕～…咿～！？…这、这是什么…啊～哈啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3739',
        any: [/\t\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3740',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、%SAVESTR:TARGET%开始有感觉了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3741-3742',
        any: [
          /%SAVESTR:TARGET%因为自己私处传来的快感而感到迷惑、开始有感觉了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3744',
        any: [/\t\t\tELSEIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3745',
        any: [
          /「啊咿呀～！？…啊～…啊～啊啊～…总觉得…好奇怪啊…那里变的…好奇怪哦～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3747',
        any: [/\t\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3748',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、慢慢的沉溺于溢出的快感之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3749-3750',
        any: [/%SAVESTR:TARGET%慢慢的沉溺于溢出的快感之中………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3752',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3753',
        any: [
          /「啊～…唔诶…啊～嗯～！嗯～！…爽、好爽～！？……啊啊、这样、好爽…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3755',
        any: [/\t\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3756',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、慢慢的沉溺于溢出的快感之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3757-3758',
        any: [/%SAVESTR:TARGET%慢慢的沉溺于溢出的快感之中………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3760-3761',
        any: [/「啊～…嗯咕～…咿～！？…这、这是怎么回事…啊～哈啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3763',
        any: [/\t\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3764',
        any: [
          /%SAVESTR:TARGET%鈍感的私处被開発得觉醒了快感、%SAVESTR:TARGET%对快感有些迷茫但还是上下动起了腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3765-3766',
        any: [
          /%SAVESTR:TARGET%因为自己私处传来的快感而感到迷惑、开始有感觉了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3769',
        any: [/\t\t\tCFLAG:335 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3771',
        any: [/\t\tELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3772',
        any: [/「啊～…嗯呜唔…这、这样做的话…会舒服吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3774',
        any: [/\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3775',
        any: [
          /%SAVESTR:TARGET%自己动着私处、但不是很有感觉、被插入的異物感令%SAVESTR:TARGET%忍不住发出了痛苦的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3776-3777',
        any: [/%SAVESTR:TARGET%生硬地遵从着你的命令………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3779',
        any: [/\t\t\tCFLAG:335 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3781',
        any: [/\t\tELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3782',
        any: [/「啊…咕、呜唔…啊～啊啊～！…这样动就可以了吧…嗯～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3784',
        any: [/\t\t\tIF TALENT:TARGET:103/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3785',
        any: [
          /因为%SAVESTR:TARGET%的私处不太容易有感觉、被插入的異物感令%SAVESTR:TARGET%忍不住发出了痛苦的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3786-3787',
        any: [/%SAVESTR:TARGET%皱着眉头忍耐着異物感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3789',
        any: [/\t\t\tCFLAG:335 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3800',
        any: [/IF\ SELECTCOM\ ==\ 35/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3800-3835',
        any: [/^IF SELECTCOM == 35$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3800',
        any: [/IF SELECTCOM == 35/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3802',
        any: [/\tIF CFLAG:TARGET:336 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3804',
        any: [/\t\tIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3805',
        any: [/「额呵呵～…还有这样的洗法啊…我会努力奉仕的哦…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3807-3808',
        any: [
          /「诶、要用%SELF_CALL\(TARGET\)%的身体来为%SELF_CALL_FIRST\(TARGET\)%做擦洗吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3810-3811',
        any: [/\t\tCFLAG:TARGET:336 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3813-3815',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3816',
        any: [
          /「啊啊啊…感觉如何呢…%SELF_CALL\(TARGET\)%的身体～…额呵呵、这样擦洗身体…总觉得…嗯…啊…哈啊～～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3817',
        any: [/%SAVESTR:TARGET%故意发出了喘息声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3818',
        any: [/\t\t\tCFLAG:336 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3820',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3821',
        any: [
          /「啊啊～…嗯呼呜…明明是在奉仕…%SELF_CALL\(TARGET\)%却自己舒服起来了…啊啊～…对不起～～%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3822',
        any: [/%SAVESTR:TARGET%的两腿之间溢出了不是泡沫的粘稠物质………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3823',
        any: [/\t\t\tCFLAG:336 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3825',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:336 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3826',
        any: [/「嗯～…嗯唔～…啊啊～…啊啊…总觉得掌握到诀窍了呢…嗯呼呜♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3827',
        any: [/\t\t\tCFLAG:336 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3829',
        any: [/\t\tELSEIF  CFLAG:336 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3830',
        any: [/「啊啊～…哈…嗯唔…啊、这、这样做是吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3831',
        any: [/\t\t\tCFLAG:336 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3840',
        any: [/IF\ SELECTCOM\ ==\ 36/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3840-3955',
        any: [/^IF SELECTCOM == 36$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3840',
        any: [/IF SELECTCOM == 36/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3842',
        any: [/\tIF CFLAG:TARGET:337 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3844',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3845',
        any: [
          /「啊啊～…快看…大肉棒被%SELF_CALL\(TARGET\)%的…屁股眼…啊～哈啊啊啊…全部吞进去了～咕呜～%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3847-3848',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3850',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3851',
        any: [
          /「嗯啊…哈啊啊…屁股眼…被撑开了………嗯咕呜～…先、先不要动哦～…就让%SELF_CALL\(TARGET\)%来…全力地动吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3853-3854',
        any: [/\t\t\tSIF ABL:3 >= 3 && TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3856-3857',
        any: [/「咕呜…不要全放进去啊…嗯～…嗯～…呜呜呜呜呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3859',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3860',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门一将鸡鸡连根吞下、%SAVESTR:TARGET%就发出了悲鳴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3861-3862',
        any: [/%SAVESTR:TARGET%被从下方抽插着肛门、痛苦的呻吟着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3865-3866',
        any: [/\t\tCFLAG:TARGET:337 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3868-3870',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3871',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3872',
        any: [
          /「啊～…嗯呼呜呜呜…不行不行不行了…屁股眼被…大肉棒…全部…插进来了～…啊啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3873',
        any: [
          /%SAVESTR:TARGET%放弃抵抗苦闷的喘息着、用肛门将阴茎全部收纳进来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3874',
        any: [
          /「哈咕呜…呜啊啊～…啊啊～…呜～…呼呜～…啊啊～…已经、已经…要不行了…已经…停不下来了～～～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3876',
        any: [/\t\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3877',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発得品尝到了快感、用肛门将阴茎连根吞入、%SAVESTR:TARGET%激烈的上下动着腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3879-3880',
        any: [/「嗯咿～…咿呜…啊啊～屁股眼好爽啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3881',
        any: [
          /「爽爆了～…总觉得其他事情都已经变的无所谓了～…啊啊～已经不能不去侍奉主人了啊～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3882',
        any: [
          /「啊啊～啊～哈啊啊啊～！屁股眼…更多的欺负～欺负～欺负吧啊～～～～～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3884',
        any: [/\t\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3885',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発得品尝到了快感、%SAVESTR:TARGET%不断地上下动着腰用肛门贪求着快感…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3888',
        any: [/\t\tCFLAG:337 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3890',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:337 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3891',
        any: [/「嗯咿～…咿呜…啊啊～屁股眼好爽啊～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3892',
        any: [
          /「爽爆了～…总觉得其他事情都已经变的无所谓了～…啊啊～已经不能不去侍奉主人了啊～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3893',
        any: [
          /「啊啊～啊～哈啊啊啊～！屁股眼…更多的欺负～欺负～欺负吧啊～～～～～～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3895',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3896',
        any: [
          /虽然%SAVESTR:TARGET%的肛门还在纠正鈍感的開発途中、但%SAVESTR:TARGET%还是淫猥地揺着腰身、用肛门品味起了阴茎…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3898',
        any: [/\t\t\tCFLAG:337 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3900',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3901',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3902',
        any: [/「啊～啊啊～…啊啊～…用屁股眼…竟然这么的有感觉～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3903',
        any: [
          /「已经…再也离不开主人了～～～…啊～啊～～啊呼呜～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3905',
        any: [/\t\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3906',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発而觉醒了快感、%SAVESTR:TARGET%一边前后摇晃着纤细的腰一边品味着肛门的快感……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3907-3908',
        any: [/%SAVESTR:TARGET%一边前后摇晃着纤细的腰一边品味着肛门的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3910-3911',
        any: [/「嗯～…啊啊～啊～～！咿呀～…哈呜呜嗯～…咿呀～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3912',
        any: [
          /「啊啊～…对不起～…明明想好好奉仕的…但因为屁股眼实在太舒服了…腰停不下来了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3914',
        any: [/\t\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3915',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被开发的能产生出快感了、%SAVESTR:TARGET%因为这种快乐而按捺不住了、腰身的上下运动已/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3916-3917',
        any: [
          /%SAVESTR:TARGET%由于肛门的快楽而按捺不住了、腰身的上下运动已经停不下来了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3920',
        any: [/\t\tCFLAG:337 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3922',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3923',
        any: [/「嗯～…啊啊～啊～～！咿呀～…哈呜呜嗯～…咿呀～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3924',
        any: [
          /「啊啊～…对不起～…明明想好好奉仕的…但因为屁股眼实在太舒服了…腰停不下来了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3926',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3927',
        any: [
          /虽然%SAVESTR:TARGET%的肛门还在纠正鈍感的開発途中、但因为是被所爱慕的%SAVESTR:PLAYER%侵犯的缘故、开心的腰都停/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3928-3929',
        any: [
          /%SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%侵犯了、%SAVESTR:TARGET%一边开心地娇喘着一边上下动着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3931',
        any: [/\t\t\tCFLAG:337 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3933',
        any: [/\t\tELSEIF ABL:3 >= 3 && \(CFLAG:337 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3934',
        any: [/「啊咿～～…不行…不行了…屁股眼爽到不行了～…啊～啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3936',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3937',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门被開発了、%SAVESTR:TARGET%一边呻吟着一边上下动着腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3938-3939',
        any: [/%SAVESTR:TARGET%觉醒了肛门的快感、一边呻吟一边上下动着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3941',
        any: [/\t\t\tCFLAG:337 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3943',
        any: [/\t\tELSEIF  CFLAG:337 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3944',
        any: [/「咕～…呜呜～…嗯嗯～…已经…不想再动了～…啊啊～…啊呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3946',
        any: [/\t\t\tIF TALENT:TARGET:105/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3947',
        any: [
          /%SAVESTR:TARGET%鈍感的肛门一将鸡鸡连根吞下、%SAVESTR:TARGET%就发出了悲鳴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3948-3949',
        any: [/%SAVESTR:TARGET%被从下方抽插着肛门、痛苦的呻吟着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3951',
        any: [/\t\t\tCFLAG:337 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3960',
        any: [/IF\ SELECTCOM\ ==\ 37/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3960-4001',
        any: [/^IF SELECTCOM == 37$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3960',
        any: [/IF SELECTCOM == 37/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3962',
        any: [/\tIF CFLAG:TARGET:338 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3964',
        any: [/\t\tIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3965',
        any: [/「嗯…咕…啾…呗咯…呗咯～…嘞咯…哈啊啊…好苦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3966',
        any: [/%SAVESTR:TARGET%下定决心用舌头舔起了%SAVESTR:PLAYER%的肛门………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3968-3969',
        any: [/「要用嘴…舔这种地方…嗯～…好臭…呜唔～…呜呜～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3970',
        any: [/%SAVESTR:TARGET%一边落泪一边亲吻着%SAVESTR:PLAYER%的肛门………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3972-3973',
        any: [/\t\tCFLAG:TARGET:338 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3975-3977',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3978',
        any: [
          /「哈啊啊…嗯～…嗯啾呜…嘞咯～…呗咯～…呗咯…啊啊～好美味啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3979',
        any: [
          /%SAVESTR:TARGET%神情陶醉的将舌头深入%SAVESTR:PLAYER%的肛门之中持续地奉仕着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3980',
        any: [/\t\t\tCFLAG:338 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3982',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3983',
        any: [/「啊哈啊…主人～…舌头伸到里面感觉舒服吗？嗯啾…啾…啾呜呜呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3984',
        any: [/%SAVESTR:TARGET%开心的将舌头深入肛门不断奉仕着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3985',
        any: [/「哈啊啊啊…奉仕太棒了…真想永远这样舔主人的肛门呢～………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3986',
        any: [/一脸陶醉的%SAVESTR:TARGET%大有将肛门侍奉持续一整天的势头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3987',
        any: [/\t\t\tCFLAG:338 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3989',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3990',
        any: [/「嘞噗～…啾呜…嘞咯～…啾～啾唔呜唔………哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3991',
        any: [/%SAVESTR:TARGET%已经习惯了肛门侍奉的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3992',
        any: [/\t\t\tCFLAG:338 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3994',
        any: [/\t\tELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3995',
        any: [/「嗯咕～…啾～…啾…嘞咯～…呗咯…啾……呜唔…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3996',
        any: [
          /%SAVESTR:TARGET%一边落泪一边用舌头舔着%SAVESTR:PLAYER%的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '3997',
        any: [/\t\t\tCFLAG:338 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4006',
        any: [/IF\ SELECTCOM\ ==\ 40/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4006-4037',
        any: [/^IF SELECTCOM == 40$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4006',
        any: [/IF SELECTCOM == 40/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4008',
        any: [/\tIF CFLAG:TARGET:341 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4009',
        any: [/「呀啊啊～！…啊啊～…为、为什么要打我啊～…咿～！不要打～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4010-4011',
        any: [/\t\tCFLAG:TARGET:341 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4013-4015',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4016',
        any: [
          /「啊～…咿呀～～…啊～～！嗯呼呜…啊～…哈啊啊啊啊～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4017',
        any: [
          /%SAVESTR:TARGET%像引诱你似的左右摇着屁股、每次被打就会发出娇艳的呻吟声、爱液从大腿上垂落下来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4018',
        any: [/\t\t\tCFLAG:TARGET:341 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4020',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4021',
        any: [/「咿呀～～…啊～…哈唔嗯～…啊啊～…请更多的…更多的打我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4022',
        any: [
          /%SAVESTR:TARGET%像引诱你似的左右摇着屁股、每次被打都会发出色气满满的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4023',
        any: [/\t\t\tCFLAG:TARGET:341 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4025',
        any: [
          /\t\tELSEIF MARK:0 == 3 && MARK:2 == 3 && \(CFLAG:341 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4026',
        any: [/「嗯～…咕呜～啊～…啊～～…咿～…咕、这、这样的…啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4027',
        any: [/%SAVESTR:TARGET%已经放弃了似的自己把屁股伸出来承受着击打………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4028',
        any: [/\t\t\tCFLAG:TARGET:341 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4030',
        any: [/\t\tELSEIF CFLAG:341 <= 1 && FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4031',
        any: [/「啊啊～…咕～…咿～…好痛～好痛啊～…请你住手吧～～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4032',
        any: [/%SAVESTR:TARGET%泪流不止悲痛地叫喊着、承受着屁股上的击打………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4033',
        any: [/\t\t\tCFLAG:TARGET:341 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4042',
        any: [/IF\ SELECTCOM\ ==\ 41/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4042-4105',
        any: [/^IF SELECTCOM == 41$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4042',
        any: [/IF SELECTCOM == 41/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4044',
        any: [/\tIF CFLAG:TARGET:342 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4046',
        any: [/\t\tIF TALENT:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4047',
        any: [/「啊啊…虽然被抽也不是不可以…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4049',
        any: [/\t\tELSEIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4050',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%是不会反抗的…所以求您了…不要这样…呀呜呜呜～！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4052-4053',
        any: [/「咿～…这、这样子…啊啊～！好痛～好痛啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4055-4056',
        any: [/\t\tCFLAG:TARGET:342 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4058-4060',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 8 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4061',
        any: [/「啊啊～…啊～…嗯咿咿咿～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4062',
        any: [
          /「啊啊啊啊…被这样打…为什么会这么舒服呢…已经…再也变不回去了…嗯～啊～…哈啊啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4063',
        any: [/每次被鞭子抽打、爱液就会从%SAVESTR:TARGET%的私处飞散开来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4064',
        any: [/\t\t\tCFLAG:TARGET:342 = 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4066',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 7 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4067',
        any: [
          /「啊～…啊～…呀呜唔嗯～…啊～哈啊～啊啊～…已经不觉得怎么痛了…因为有感觉了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4068',
        any: [
          /%SAVESTR:TARGET%每次被鞭子抽打就会发出娇艳的呻吟、惹来了更加强烈的鞭打………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4069',
        any: [/\t\t\tCFLAG:TARGET:342 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4071',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:342 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4072',
        any: [
          /「呀呜呜～～…请赐给我这只色情的母狗…更多的痛苦吧…请我更多的惩罚吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4073',
        any: [/%SAVESTR:TARGET%每次被鞭打就会蜷曲着身体发出悲鸣声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4074',
        any: [/\t\t\tCFLAG:TARGET:342 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4076',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4077',
        any: [
          /「啊啊～…啊～…啊啊啊～～！…哈啊…哈啊…啊啊…好奇怪…这样…好奇怪啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4078',
        any: [/%SAVESTR:TARGET%每次被鞭打就会摩擦起双腿、露出陶醉的表情。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4079',
        any: [/「总觉得…好舒服呢…啊啊～请更多地…鞭笞我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4080',
        any: [/\t\t\tCFLAG:TARGET:342 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4082',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4083',
        any: [
          /「啊啊～…嗯～…嗯啊～…咿～…啊啊…为…什么…明明…是被鞭打…啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4084',
        any: [
          /%SAVESTR:TARGET%不断地被鞭打着。但是比起痛楚更多的是一种奇妙的瘙痒感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4085',
        any: [/\t\t\tCFLAG:TARGET:342 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4087',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:342 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4088',
        any: [
          /「%SELF_CALL\(TARGET\)%是…不会…反抗你的…不会反抗的…啊啊…所以…请饶了我吧…咿～～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4089',
        any: [/%SAVESTR:TARGET%一被鞭打就出声讨饶………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4090',
        any: [/\t\t\tCFLAG:TARGET:342 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4092',
        any: [/\t\tELSEIF ABL:21 >= 3 && \(CFLAG:342 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4093',
        any: [/「啊啊～！…啊啊…不、不对…这是…咿呀～～…啊～啊啊啊～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4094',
        any: [
          /%SAVESTR:PLAYER%的鞭子在%SAVESTR:TARGET%的身上一次又一次的抽打着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4095',
        any: [/然后每鞭打数次%SAVESTR:TARGET%就会发出一声娇艳的呻吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4096',
        any: [/\t\t\tCFLAG:TARGET:342 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4098',
        any: [/\t\tELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4099',
        any: [/「啊啊～…求你了…快住手吧…求你了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4100',
        any: [/%SAVESTR:TARGET%泪流满面、祈求饶恕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4101',
        any: [/\t\t\tCFLAG:TARGET:342 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4110',
        any: [/IF\ SELECTCOM\ ==\ 42/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4110-4170',
        any: [/^IF SELECTCOM == 42$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4110',
        any: [/IF SELECTCOM == 42/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4112',
        any: [/\tIF CFLAG:TARGET:343 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4114',
        any: [/\t\tIF TALENT:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4115',
        any: [
          /「啊啊啊…这次要这样開発%SELF_CALL\(TARGET\)%吗～…是～…我会好好忍耐的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4117',
        any: [/\t\tELSEIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4118',
        any: [
          /「不、不要～…%SELF_CALL\(TARGET\)%是…不会反抗的…所以只有会痛的事情…啊啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4120-4121',
        any: [/「要、要用这根针做什么…啊啊～住～､住手啊啊啊啊啊啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4123-4124',
        any: [/\t\tCFLAG:TARGET:343 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4126-4128',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 8 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4129',
        any: [/「啊～…哈呜～…嗯～…那里～…还要…还想被刺啊～～～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4130',
        any: [
          /%SAVESTR:TARGET%发出了快乐的呻吟声、血从柔嫩的肌肤上滴落下来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4131',
        any: [/\t\t\tCFLAG:TARGET:343 = 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4133',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 7 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4134',
        any: [/「嗯呼呜…继续…继续插我～…嗯咿～…总觉得好麻啊…啊～啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4135',
        any: [/%SAVESTR:TARGET%因为被针刺的麻痒感觉而迷惑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4136',
        any: [/\t\t\tCFLAG:TARGET:343 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4138',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:343 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4139',
        any: [/「嗯啊～…啊～…哈咕呜…果然…还是很痛～…咕…嗯嗯嗯～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4140',
        any: [/%SAVESTR:TARGET%忍耐着被针刺的疼痛………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4141',
        any: [/\t\t\tCFLAG:TARGET:343 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4143',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4144',
        any: [
          /「明明…应该…只会感到痛的…嗯呼呜…为什么会有感觉…呢…………呀啊啊～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4145',
        any: [
          /%SAVESTR:TARGET%发出了快乐的呻吟声、血从柔嫩的肌肤上滴落下来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4146',
        any: [/\t\t\tCFLAG:TARGET:343 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4148',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4149',
        any: [/「啊～…啊～…嗯呼呜…明明是被刺着…为什么…啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4150',
        any: [/%SAVESTR:TARGET%因为被针刺的麻痒感觉而迷惑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4151',
        any: [/\t\t\tCFLAG:TARGET:343 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4153',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:343 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4154',
        any: [
          /「啊啊…求求你…%SELF_CALL\(TARGET\)%是不会反抗你的…所以不要再让我痛了…啊啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4155',
        any: [/%SAVESTR:TARGET%每次被针戳就会发出悲鸣声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4156',
        any: [/\t\t\tCFLAG:TARGET:343 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4158',
        any: [/\t\tELSEIF ABL:21 >= 3 && \(CFLAG:343 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4159',
        any: [/「咕呜～…嗯～…啊啊～…啊啊啊啊…总觉得…像过电似的…好奇怪…呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4160',
        any: [/%SAVESTR:TARGET%因为被针刺的麻痒感觉而迷惑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4161',
        any: [/\t\t\tCFLAG:TARGET:343 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4163',
        any: [/\t\tELSEIF CFLAG:343 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4164',
        any: [/「咕呜～…呜啊啊…啊～…咕呜呜～…咿～～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4165',
        any: [
          /%SAVESTR:TARGET%咬着嘴唇忍受着痛楚、但还是从嘴边漏出了痛苦的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4166',
        any: [/\t\t\tCFLAG:TARGET:343 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4176',
        any: [/IF\ SELECTCOM\ ==\ 43 && TEQUIP:43/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4176-4212',
        any: [/^IF SELECTCOM == 43 && TEQUIP:43$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4214-4225',
        any: [/^ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4176',
        any: [/IF SELECTCOM == 43 && TEQUIP:43/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4178',
        any: [/\tIF CFLAG:TARGET:344 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4180-4181',
        any: [/\t\tIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4183-4184',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4186-4187',
        any: [/\t\tCFLAG:TARGET:344 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4189-4192',
        any: [
          /\t\tIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4193',
        any: [/\t\t\tCFLAG:TARGET:344 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4195-4196',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4197',
        any: [/\t\t\tCFLAG:TARGET:344 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4199-4200',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4201',
        any: [/\t\t\tCFLAG:TARGET:344 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4203-4204',
        any: [/\t\tELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4205',
        any: [/\t\t\tCFLAG:TARGET:344 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4207-4208',
        any: [/\t\tELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4209',
        any: [/\t\t\tCFLAG:TARGET:344 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4214',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4216-4217',
        any: [
          /\tIF TALENT:TARGET:85 == 1 && \(CFLAG:380 < 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4218',
        any: [/\t\tCFLAG:380 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4220-4221',
        any: [/\tELSEIF CFLAG:380 < 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4222',
        any: [/\t\tCFLAG:380 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4231',
        any: [/IF\ SELECTCOM\ ==\ 44 && TEQUIP:44/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4231-4298',
        any: [/^IF SELECTCOM == 44 && TEQUIP:44$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4300-4315',
        any: [/^ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4231',
        any: [/IF SELECTCOM == 44 && TEQUIP:44/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4233',
        any: [/\tIF CFLAG:TARGET:345 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4235',
        any: [/\t\tIF TALENT:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4236',
        any: [/「啊啊啊…请再绑紧一点～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4237',
        any: [
          /%SAVESTR:TARGET%的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4239',
        any: [/\t\tELSEIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4240',
        any: [/「这就是所谓的爱的奴隷…吧…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4241',
        any: [
          /「额呵呵、%SELF_CALL\(TARGET\)%即使没被绳子绑起来…也不会想逃走啦………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4242',
        any: [
          /%SAVESTR:TARGET%的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4244-4245',
        any: [/「哈啊哈啊…这、这样子…没事…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4246',
        any: [
          /%SAVESTR:TARGET%的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4248-4249',
        any: [/\t\tCFLAG:TARGET:345 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4251-4253',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 8 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4254',
        any: [/「啊啊啊～…被绳子绑的紧紧的～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4255',
        any: [
          /「啊啊～…明明被绳子绑着应该感到又痛又怕的…啊～啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4256',
        any: [/%SAVESTR:TARGET%被绳子绑着、爱液不停地滴落下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4257',
        any: [/\t\t\tCFLAG:TARGET:345 = 9/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4259',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 7 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4260',
        any: [/「是～…我喜欢被…捆绑呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4261',
        any: [/「因为喜欢…所以请更多的…绑我吧………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4262',
        any: [/%SAVESTR:TARGET%扭扭捏捏的用期待的眼神看着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4263',
        any: [/\t\t\tCFLAG:TARGET:345 = 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4265',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:345 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4266',
        any: [/「嗯呼呜…要被绳子吃掉了…好爽～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4267',
        any: [/%SAVESTR:TARGET%被粗绳子绑着显得很愉悦的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4268',
        any: [/\t\t\tCFLAG:TARGET:345 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4270',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4271',
        any: [
          /「啊啊啊…果然%SELF_CALL\(TARGET\)%是…主人的所有物…再次得到確認了…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4272',
        any: [
          /「啊～～…被绑着…虽然痛…但是好舒服～…咿呀～～！啊～～！啊啊～♪」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4273',
        any: [/%SAVESTR:TARGET%露出发情的母狗般的表情被粗绳子绑住了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4274',
        any: [/\t\t\tCFLAG:TARGET:345 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4276',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4277',
        any: [/「嗯呜唔…总觉的…感觉变的好奇怪～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4278',
        any: [
          /「请再绑紧一点…让%SELF_CALL\(TARGET\)%再也逃不出主人的五指山………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4279',
        any: [/%SAVESTR:TARGET%一脸愉悦地被粗绳子绑住………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4280',
        any: [/\t\t\tCFLAG:TARGET:345 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4282',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:345 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4283',
        any: [
          /「啊啊啊…请再绑紧一点～…这就是%SELF_CALL\(TARGET\)%是主人的所有物的证据…啊啊啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4284',
        any: [/%SAVESTR:TARGET%一脸陶醉地被粗绳子绑住………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4285',
        any: [/\t\t\tCFLAG:TARGET:345 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4287',
        any: [/\t\tELSEIF ABL:21 >= 3 && \(CFLAG:345 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4288',
        any: [
          /「啊啊啊…为什么…明明被绑起来了…那个地方却痒痒的…啊～、我刚才什么也没说…什么也没有」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4289',
        any: [
          /%SAVESTR:TARGET%的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4290',
        any: [/\t\t\tCFLAG:TARGET:345 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4292',
        any: [/\t\tELSEIF CFLAG:345 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4293',
        any: [/「哈啊～…啊～…嗯～…这样、不算什么………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4294',
        any: [
          /%SAVESTR:TARGET%的柔嫩肌肤被粗绳子相当紧的五花大绑起来了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4295',
        any: [/\t\t\tCFLAG:TARGET:345 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4300',
        any: [/ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4302',
        any: [
          /\tIF TALENT:TARGET:76 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4303',
        any: [
          /「哈啊…哈啊…啊啊…明明可以再绑一会儿的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4304',
        any: [/\t\tCFLAG:385 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4306',
        any: [
          /\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4307',
        any: [/「额呵呵…下次什么时候再把我绑起来吧…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4308',
        any: [/\t\tCFLAG:385 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4310',
        any: [/\tELSEIF CFLAG:385 < 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4311',
        any: [/「哈啊哈啊…这、这样子…啊啊～会留下痕迹的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4312',
        any: [/\t\tCFLAG:385 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4321',
        any: [/IF\ SELECTCOM\ ==\ 45 && TEQUIP:45/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4321-4357',
        any: [/^IF SELECTCOM == 45 && TEQUIP:45$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4359-4370',
        any: [/^ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4321',
        any: [/IF SELECTCOM == 45 && TEQUIP:45/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4323',
        any: [/\tIF CFLAG:TARGET:346 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4325',
        any: [/\t\tIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4326',
        any: [/「哈咕～…嗯～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4328-4329',
        any: [/「哈咕～…呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4331-4332',
        any: [/\t\tCFLAG:TARGET:346 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4334-4336',
        any: [
          /\t\tIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4337',
        any: [/「哈咕～…嗯～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4338',
        any: [/\t\t\tCFLAG:TARGET:346 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4340',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4341',
        any: [/「哈咕～…嗯～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4342',
        any: [/\t\t\tCFLAG:TARGET:346 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4344',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:346 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4345',
        any: [/「哈咕～…嗯～%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4346',
        any: [/\t\t\tCFLAG:TARGET:346 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4348',
        any: [/\t\tELSEIF ABL:21 >= 3 && \(CFLAG:346 <= 2 \|\| FLAG:7 == 2\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4349',
        any: [/「哈咕～…呜唔嗯…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4350',
        any: [/\t\t\tCFLAG:TARGET:346 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4352',
        any: [/\t\tELSEIF CFLAG:346 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4353',
        any: [/「哈咕～…呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4354',
        any: [/\t\t\tCFLAG:TARGET:346 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4359',
        any: [/ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4361',
        any: [
          /\tIF \(TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1\) && \(CFLAG:386 < 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4362',
        any: [/「嗯咕～…噗啊…哈啊…哈啊…哈啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4363',
        any: [/\t\tCFLAG:386 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4365',
        any: [/\tELSEIF CFLAG:386 < 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4366',
        any: [/「嗯咕～…噗啊…哈啊…哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4367',
        any: [/\t\tCFLAG:386 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4376',
        any: [/IF\ SELECTCOM\ ==\ 46 && TEQUIP:46/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4376-4424',
        any: [/^IF SELECTCOM == 46 && TEQUIP:46$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4427-4497',
        any: [/^ELSEIF SELECTCOM == 46 && TEQUIP:46 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4376',
        any: [/IF SELECTCOM == 46 && TEQUIP:46/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4378',
        any: [/\tIF CFLAG:TARGET:347 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4380',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4381',
        any: [/「呼啊啊～…肚子鼓起来了…啊啊～…这是…什么…肚子…啊啊～…啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4383',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4384',
        any: [/「肚子好难受…好难受呢…请不要…太欺负我了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4386-4387',
        any: [/「咿～…不要不要不要啊～…像这样灌进去的话…呜～…咕呜…好难受～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4389-4390',
        any: [/\t\tCFLAG:TARGET:347 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4392-4394',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 6 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4395',
        any: [/「啊～…啊啊～…再灌啊…灌到极限为止～…把肚子灌成水桶似的吧…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4396',
        any: [
          /「嗯～…哈啊…哈啊…%SELF_CALL\(TARGET\)%的肚子…已经变成主人的玩具了～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4397',
        any: [
          /「接下来…肚子里的东西全部喷出来的不堪入目的样子…请好好欣赏吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4398',
        any: [/\t\t\tCFLAG:347 = 7/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4400',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:347 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4401',
        any: [/「咿呀啊啊啊…浣腸液…咕噜咕噜的灌进肚子里面去了～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4402',
        any: [
          /「啊啊啊啊…%SELF_CALL\(TARGET\)%肚子里的丑陋的东西…要全部排出来啦………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4403',
        any: [/\t\t\tCFLAG:347 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4405',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4406',
        any: [
          /「啊～啊啊～…是～…浣腸液…还能再进来一些…咿～咿～咿咿咿咿～！」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4407',
        any: [
          /「啊～…啊啊啊…被浣腸液这么灌进来…为什么%SELF_CALL\(TARGET\)%却感到高兴呢…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4408',
        any: [
          /（%SELF_CALL\(TARGET\)%的身体…甚至连排泄…都已经是主人的玩物了…）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4409',
        any: [/\t\t\tCFLAG:347 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4411',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:347 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4412',
        any: [
          /「啊啊～…这样子灌进来的话…很快…就要全部排出来了…好害羞～…不要欺负我………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4413',
        any: [/\t\t\tCFLAG:347 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4415',
        any: [
          /\t\tELSEIF ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4416',
        any: [
          /「啊～啊啊啊～…明明应该很难受的…啊～啊啊～…屁股…好奇怪啊～…屁股要变的不像话了～………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4417',
        any: [/\t\t\tCFLAG:347 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4419',
        any: [/\t\tELSEIF  CFLAG:347 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4420',
        any: [/「啊啊～…肚子好难受…好狠心…好狠心啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4421',
        any: [/\t\t\tCFLAG:347 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4427',
        any: [/ELSEIF SELECTCOM == 46 && TEQUIP:46 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4429',
        any: [/\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4431',
        any: [/\t\tIF ABL:3 >= 3 && ABL:21 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4432',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4433',
        any: [/「呀…嗯啊、啊、啊啊！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4434-4435',
        any: [/「啊啊～！、不行、不、不要看、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4437',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4438',
        any: [/出来了、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4439-4440',
        any: [/出来、要出来了、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4442',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      { src: 'target/ERB/口上/EVENT_K0_慈愛.ERB', ref: '4443', any: [/全部/] },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4445',
        any: [/要排出来了啊%UNICODE\(0x2661\) \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4446',
        any: [/\t\t\tIF TEQUIP:11/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4447',
        any: [/\t\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4448',
        any: [/以Ｍ字的状态大开双腿的%SAVESTR:TARGET%那秘所之中/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4449-4450',
        any: [/四肢着地的%SAVESTR:TARGET%那股間之中/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4452',
        any: [/极粗的蠕虫正在蠢动着、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4454',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4455',
        any: [
          /%SAVESTR:TARGET%露出欢愉又夹杂着苦痛的表情、因为排泄的快感而扭动着身体。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4456-4457',
        any: [
          /随着下流的声音，那污物正从%SAVESTR:TARGET%的肛門之中喷吐而出、%SAVESTR:TARGET%露出了恍惚失神的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4459',
        any: [/\t\t\tIF EXP:53 >= 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4460',
        any: [/那扩张开来无法闭合的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4461',
        any: [/\t\t\t\tIF RAND:2 == 0/m],
      },
      { src: 'target/ERB/口上/EVENT_K0_慈愛.ERB', ref: '4462', any: [/肛門/] },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4463-4464',
        any: [/肛穴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4466',
        any: [/之中，可以看清那内壁正在痙攣着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4468-4469',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4472',
        any: [/\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4474',
        any: [/\t\tIF ABL:3 >= 3 && ABL:21 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4475',
        any: [/「主人…%SELF_CALL\(TARGET\)%那/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4476',
        any: [/\t\t\tIF RAND:3 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4477',
        any: [/排泄的地方也/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4478',
        any: [/\t\t\tELSEIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4479',
        any: [/肮脏的地方也/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4480-4481',
        any: [/出来的地方也/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4483',
        any: [/\t\t\tIF RAND:2 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4484',
        any: [/请您好好地观赏……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4485-4486',
        any: [/请您好好地疼爱……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4488-4489',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4492-4493',
        any: [/\tELSEIF ABL:3 >= 3 && ABL:21 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4494-4495',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4510',
        any: [/IF\ SELECTCOM\ ==\ 55/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4510-4638',
        any: [/^IF SELECTCOM == 55$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4510',
        any: [/IF SELECTCOM == 55/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4512',
        any: [/\tIF CFLAG:356 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4514',
        any: [/\t\tIF ASSI > 0 && ASSIPLAY/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4515',
        any: [/%SAVESTR:TARGET%偷偷看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4517',
        any: [/\t\tELSEIF TALENT:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4518',
        any: [/「哈啊…哈啊…主人～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4519',
        any: [/%SAVESTR:TARGET%露出苦闷的表情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4521',
        any: [/\t\tELSEIF TALENT:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4522',
        any: [/「嗯…那、那个…请…再调教我吧………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4523',
        any: [/%SAVESTR:TARGET%好像还很欲求不满的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4525-4526',
        any: [/「休、休息一下是吗………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4527',
        any: [/%SAVESTR:TARGET%偷偷看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4531-4532',
        any: [/\t\tSIF TEQUIP:11/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4534-4535',
        any: [/\t\tSIF TEQUIP:13/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4537-4538',
        any: [/\t\tSIF TEQUIP:19/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4540-4541',
        any: [/\t\tSIF TEQUIP:14/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4543-4544',
        any: [/\t\tSIF TEQUIP:15/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4546-4547',
        any: [/\t\tSIF TEQUIP:16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4549-4550',
        any: [/\t\tSIF TEQUIP:17/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4552-4553',
        any: [/\t\tSIF TEQUIP:43/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4555-4556',
        any: [/\t\tSIF TEQUIP:44/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4558-4559',
        any: [/\t\tSIF TEQUIP:46/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4561-4562',
        any: [/\t\tSIF TEQUIP:49/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4564-4565',
        any: [/\t\tSIF TEQUIP:53/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4566-4567',
        any: [/\t\tCFLAG:356 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4569-4571',
        any: [/\t\tIF ASSI > 0 && ASSIPLAY/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4572',
        any: [/%SAVESTR:TARGET%偷偷看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4574',
        any: [
          /\t\tELSEIF TALENT:76 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 5 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4575',
        any: [/「啊啊～…主人…求、求你了…请不要不理我…嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4576',
        any: [/%SAVESTR:TARGET%露出発情般的表情向%SAVESTR:PLAYER%撒娇…………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4577',
        any: [/\t\t\tCFLAG:356 = 6/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4579',
        any: [
          /\t\tELSEIF TALENT:76 == 1 && \(CFLAG:356 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4580',
        any: [/「嗯…那、那个…请…再调教我吧………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4581',
        any: [/%SAVESTR:TARGET%好像还很欲求不满的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4582',
        any: [/\t\t\tCFLAG:356 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4584',
        any: [
          /\t\tELSEIF TALENT:85 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4585',
        any: [
          /「主人…你、你好坏啊～…%SELF_CALL\(TARGET\)%明明…这么想奉仕您…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4586',
        any: [/%SAVESTR:TARGET%露出発情般的表情看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4587',
        any: [/\t\t\tCFLAG:356 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4589',
        any: [
          /\t\tELSEIF TALENT:85 == 1 && \(CFLAG:356 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4590',
        any: [/「哈啊…哈啊…主人～…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4591',
        any: [/%SAVESTR:TARGET%露出苦闷的表情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4592',
        any: [/\t\t\tCFLAG:356 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4594',
        any: [/\t\tELSEIF CFLAG:356 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4595',
        any: [/「休、休息一下是吗………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4596',
        any: [/%SAVESTR:TARGET%偷偷看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4597',
        any: [/\t\t\tCFLAG:356 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4601-4602',
        any: [/\t\tSIF TEQUIP:11/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4604-4605',
        any: [/\t\tSIF TEQUIP:13/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4607-4608',
        any: [/\t\tSIF TEQUIP:19/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4610-4611',
        any: [/\t\tSIF TEQUIP:14/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4613-4614',
        any: [/\t\tSIF TEQUIP:15/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4616-4617',
        any: [/\t\tSIF TEQUIP:16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4619-4620',
        any: [/\t\tSIF TEQUIP:17/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4622-4623',
        any: [/\t\tSIF TEQUIP:43/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4625-4626',
        any: [/\t\tSIF TEQUIP:44/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4628-4629',
        any: [/\t\tSIF TEQUIP:46/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4631-4632',
        any: [/\t\tSIF TEQUIP:49/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4634-4635',
        any: [/\t\tSIF TEQUIP:53/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4529',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4599',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4645',
        any: [/IF\ SELECTCOM\ ==\ 56/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4645-4758',
        any: [/^IF SELECTCOM == 56$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4645',
        any: [/IF SELECTCOM == 56/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4647',
        any: [/\tIF CFLAG:357 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4649',
        any: [/\t\tIF TEQUIP:53 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4650',
        any: [/%NAME:MASTER%让%SAVESTR:TARGET%做个自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4651',
        any: [/\t\t\tIF RAND:3 == 0 && \(TALENT:89 \|\| ABL:17 >= 5\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4652',
        any: [/于是%SAVESTR:TARGET%就将自己的本名、至今为止的性体験/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4653-4654',
        any: [/\t\t\t\tSIF ABL:31 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4655',
        any: [/开始愉快的说了起来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4656',
        any: [
          /单是想到这个水晶球会流传到故郷认识的人手里，%SAVESTR:TARGET%两腿之间就变的湿润起来了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4657',
        any: [/\t\t\t\tTFLAG:32 \|= 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4658',
        any: [
          /\t\t\tELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4659',
        any: [/于是%SAVESTR:TARGET%就对着水晶球开始说起了下流的话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4660',
        any: [/\t\t\t\tTFLAG:32 \|= 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4661',
        any: [
          /\t\t\tELSEIF TALENT:85 \|\| ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4662',
        any: [/于是%SAVESTR:TARGET%就对着水晶球做起了自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4663',
        any: [/\t\t\t\tTFLAG:32 \|= 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4664-4665',
        any: [/但%SAVESTR:TARGET%把头转向一边什么话也不说。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4668-4669',
        any: [
          /\t\t\tIF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4670',
        any: [/%SAVESTR:TARGET%一边扭动着腰一边与%SAVESTR:PLAYER%说着情话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4671',
        any: [
          /\t\t\tELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4672',
        any: [
          /%SAVESTR:TARGET%一边扭动着腰一边与%SAVESTR:PLAYER%说着下流的话。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4673',
        any: [
          /\t\t\tELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85 \|\| TALENT:76\) && PALAM:5 >= PALAMLV:4/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4674',
        any: [/%SAVESTR:TARGET%一边竭力按捺住/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4675',
        any: [
          /\t\t\t\tIF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4676',
        any: [/快楽的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4677',
        any: [/\t\t\t\tELSEIF TEQUIP:44 \|\| TEQUIP:49/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4678',
        any: [/痛苦的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4679-4680',
        any: [/自己的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4682',
        any: [/声音，一边回应着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4684',
        any: [/\t\t\tELSEIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4685',
        any: [
          /%SAVESTR:TARGET%用比起会話更想做爱的態度与%SAVESTR:PLAYER%说着话。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4686',
        any: [/「明明谈话什么的怎样都好………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4687',
        any: [
          /\t\t\tELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4688',
        any: [/%SAVESTR:TARGET%在很融洽的气氛中与%SAVESTR:PLAYER%说着话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4689',
        any: [/「从来没想过能在这种气氛下和你谈话呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4690',
        any: [/\t\t\tELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4691',
        any: [/面对%SAVESTR:PLAYER%的搭话，怯生生的%SAVESTR:TARGET%回问道/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4692',
        any: [/「您…是在和我说话吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4693-4694',
        any: [
          /虽然%SAVESTR:TARGET%说了话，但%SAVESTR:TARGET%却好像没听到似的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4697-4698',
        any: [/\t\tCFLAG:357 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4700-4702',
        any: [/\t\tIF TEQUIP:53 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4703',
        any: [/%NAME:MASTER%让%SAVESTR:TARGET%作个自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4704',
        any: [
          /\t\t\tIF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4705',
        any: [/%SAVESTR:TARGET%一边扭动着腰一边对着水晶球说着情话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4706',
        any: [/\t\t\t\tTFLAG:32 \|= 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4707',
        any: [
          /\t\t\tELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4708',
        any: [/%SAVESTR:TARGET%一边扭动着腰一边对着水晶球不停地说着下流的话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4709',
        any: [/\t\t\t\tTFLAG:32 \|= 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4710',
        any: [/\t\t\tELSEIF RAND:3 == 0 && \(TALENT:89 \|\| ABL:17 >= 5\)/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4711',
        any: [/于是%SAVESTR:TARGET%就将自己的本名、至今为止的性体験/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4712-4713',
        any: [/\t\t\t\tSIF ABL:31 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4714',
        any: [/开始愉快的说了起来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4715',
        any: [
          /单是想到这个水晶球会流传到故郷认识的人手里，%SAVESTR:TARGET%两腿之间就变的湿润起来了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4716',
        any: [/\t\t\t\tTFLAG:32 \|= 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4717',
        any: [
          /\t\t\tELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4718',
        any: [/于是%SAVESTR:TARGET%就对着水晶球开始说起了下流的话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4719',
        any: [/\t\t\t\tTFLAG:32 \|= 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4720',
        any: [
          /\t\t\tELSEIF TALENT:85 \|\| ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4721',
        any: [/于是%SAVESTR:TARGET%就对着水晶球作起了自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4722',
        any: [/\t\t\t\tTFLAG:32 \|= 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4723-4724',
        any: [/但%SAVESTR:TARGET%把头转向一边什么话也不说。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4727-4728',
        any: [
          /\t\t\tIF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4729',
        any: [/%SAVESTR:TARGET%一边扭动着腰一边与%SAVESTR:PLAYER%说着情话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4730',
        any: [
          /\t\t\tELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4731',
        any: [
          /%SAVESTR:TARGET%一边扭动着腰一边与%SAVESTR:PLAYER%说着下流的话。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4732',
        any: [
          /\t\t\tELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85 \|\| TALENT:76\) && PALAM:5 >= PALAMLV:4/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4733',
        any: [/%SAVESTR:TARGET%一边竭力按捺住/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4734',
        any: [
          /\t\t\t\tIF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4735',
        any: [/快楽的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4736',
        any: [/\t\t\t\tELSEIF TEQUIP:44 \|\| TEQUIP:49/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4737',
        any: [/痛苦的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4738-4739',
        any: [/自己的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4741',
        any: [/声音，一边回应着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4743',
        any: [/\t\t\tELSEIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4744',
        any: [
          /%SAVESTR:TARGET%用比起会話更想做爱的態度与%SAVESTR:PLAYER%说着话。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4745',
        any: [/「明明谈话什么的怎样都好………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4746',
        any: [
          /\t\t\tELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4747',
        any: [/%SAVESTR:TARGET%在很融洽的气氛中与%SAVESTR:PLAYER%说着话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4748',
        any: [/「从来没想过能在这种气氛下和你谈话呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4749',
        any: [/\t\t\tELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4750',
        any: [/面对%SAVESTR:PLAYER%的搭话，怯生生的%SAVESTR:TARGET%回问道/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4751',
        any: [/「您…是在和我说话吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4752-4753',
        any: [
          /虽然%SAVESTR:TARGET%说了话，但%SAVESTR:TARGET%却好像没听到似的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4763-4838',
        any: [/^IF SELECTCOM == 123$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4763',
        any: [/IF SELECTCOM == 123/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4765',
        any: [/\tIF CFLAG:TARGET:360 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4767',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4768',
        any: [
          /%SAVESTR:TARGET%用双乳夹住了%NAME:MASTER%的阴茎并把前端含进嘴里开始细致的舔舐起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4769-4770',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4771',
        any: [
          /「好烫啊～…大肉棒～%UNICODE\(0x2661\) \*1% 大肉棒～%UNICODE\(0x2661\) \*1% 啊啊啊…嗯～嗯咕呜～嗯咻～咻/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4772-4773',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4775',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4776',
        any: [
          /%SAVESTR:TARGET%用双乳夹住了%NAME:MASTER%的阴茎并温柔地亲吻着前端。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4777-4778',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4779',
        any: [
          /「啾～啾～…%UNICODE\(0x2661\) \*1% 请变的更爽吧～…嗯啾啾～…嘞咯～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4780-4781',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4783',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4784',
        any: [
          /%SAVESTR:TARGET%用双乳夹住了%NAME:MASTER%的阴茎并舔舐起了前端。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4785-4786',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4787',
        any: [
          /「嗯姆呜～…嗯～嗯～%UNICODE\(0x2661\) \*1%…嗯哈啊…会让你…变的…更舒服的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4788-4789',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4791-4792',
        any: [/%SAVESTR:TARGET%用双乳夹住了%NAME:MASTER%的阴茎并亲吻着前端。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4793-4794',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4795',
        any: [/「嗯啾噜～…嗯～…啊呼呜…啊啊…哈啊哈啊……这、这样可以吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4797-4798',
        any: [/\t\tCFLAG:TARGET:360 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4800-4802',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4803',
        any: [
          /%SAVESTR:TARGET%用双乳夹住了%NAME:MASTER%的阴茎并把前端含进嘴里开始细致的舔舐起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4804-4805',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4806',
        any: [
          /「好烫啊～…大肉棒～%UNICODE\(0x2661\) \*1% 大肉棒～%UNICODE\(0x2661\) \*1% 啊啊啊…嗯～嗯咕呜～嗯咻～咻/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4807-4808',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4809',
        any: [/\t\t\tCFLAG:360 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4811',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:360 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4812',
        any: [
          /%SAVESTR:TARGET%用双乳夹住了%NAME:MASTER%的阴茎并温柔地亲吻着前端。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4813-4814',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4815',
        any: [
          /「啾～啾～…%UNICODE\(0x2661\) \*1% 请变的更爽吧～…嗯啾啾～…嘞咯～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4816-4817',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4818',
        any: [/\t\t\tCFLAG:360 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4820',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:360 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4821',
        any: [
          /%SAVESTR:TARGET%用双乳夹住了%NAME:MASTER%的阴茎并舔舐起了前端。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4822-4823',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4824',
        any: [
          /「嗯姆呜～…嗯～嗯～%UNICODE\(0x2661\) \*1%…嗯哈啊…会让你…变的…更舒服的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4825-4826',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4827',
        any: [/\t\t\tCFLAG:360 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4829',
        any: [/\t\tELSEIF CFLAG:360 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4830',
        any: [/%SAVESTR:TARGET%用双乳夹住了%NAME:MASTER%的阴茎并亲吻着前端。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4831-4832',
        any: [
          /\t\t\t\tSIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4833',
        any: [/「嗯啾噜～…嗯～…啊呼呜…啊啊…哈啊哈啊……这、这样可以吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4834',
        any: [/\t\t\tCFLAG:360 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4842-4897',
        any: [/^IF SELECTCOM == 125$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4842',
        any: [/IF SELECTCOM == 125/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4844',
        any: [/\tIF CFLAG:TARGET:361 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4846',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4847',
        any: [
          /%SAVESTR:TARGET%用一只手伸向自己的阴部、同时嘟起嘴含住了阴茎开始自慰起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4848',
        any: [
          /「嗯咕～…嘞噗～…嘞咯～…嗯咕～嗯咕～…嗯唔～嗯呼呜呜呜呜%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4850',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4851',
        any: [
          /%SAVESTR:TARGET%遵照命令将一只手伸向自己的阴部、一边自慰一边亲吻着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4852',
        any: [
          /「哈啊…虽然一边含着大鸡鸡一边自慰什么的…很不像话…但实在是忍不住嘛…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4854',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4855',
        any: [/%SAVESTR:TARGET%遵照命令在口交的同时开始自慰起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4856',
        any: [/「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4858-4859',
        any: [/%SAVESTR:TARGET%遵照命令在口交的同时开始自慰起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4860',
        any: [/「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4862-4863',
        any: [/\t\tCFLAG:TARGET:361 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4865-4867',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4868',
        any: [
          /%SAVESTR:TARGET%用一只手伸向自己的阴部、同时嘟起嘴含住了阴茎开始自慰起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4869',
        any: [
          /「嗯咕～…嘞噗～…嘞咯～…嗯咕～嗯咕～…嗯唔～嗯呼呜呜呜呜%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4870',
        any: [
          /%SAVESTR:TARGET%开心的一边流着口水、一边啧啧有声地玩弄着私处………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4871-4872',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4873',
        any: [/\t\t\tCFLAG:361 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4875',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:361 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4876',
        any: [
          /%SAVESTR:TARGET%遵照命令将一只手伸向自己的阴部、一边自慰一边亲吻着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4877',
        any: [
          /「哈啊…虽然一边含着大鸡鸡一边自慰什么的…很不像话…但实在是忍不住嘛…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4878',
        any: [
          /「啊咕～…嗯啾…咻噜呜～…嘞噗～…嗯咕～…嗯～嗯嗯嗯～嗯呼呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4879-4880',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4881',
        any: [/\t\t\tCFLAG:361 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4883',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:361 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4884',
        any: [/%SAVESTR:TARGET%遵照命令在口交的同时开始自慰起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4885',
        any: [/「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4886-4887',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4888',
        any: [/\t\t\tCFLAG:361 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4890',
        any: [/\t\tELSEIF CFLAG:361 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4891',
        any: [/%SAVESTR:TARGET%遵照命令在口交的同时开始自慰起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4892',
        any: [/「嗯～…明明这样很不像话…啊啊～…嗯～嗯呜唔～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4893',
        any: [/\t\t\tCFLAG:361 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4902-4957',
        any: [/^IF SELECTCOM == 126$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4902',
        any: [/IF SELECTCOM == 126/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4904',
        any: [/\tIF CFLAG:TARGET:362 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4906',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4907',
        any: [
          /%SAVESTR:TARGET%淫笑着用手握住阴茎、细致温柔地撸着并用嘴含住了亀頭。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4908',
        any: [
          /「我会很卖力的撸啦～…请将你的心意赏到%SELF_CALL\(TARGET\)%的嘴里吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4910',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4911',
        any: [
          /%SAVESTR:TARGET%脉脉含情的看着你、用嘴含住了亀頭开始撸起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4912',
        any: [
          /「啊啊啊…能为你做奉仕真开心…嗯唔～…啾～嘞噗～…嗯咕～…嗯呼呜…啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4914',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4915',
        any: [/%SAVESTR:TARGET%把亀頭含在嘴里、开始撸起了阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4916',
        any: [/「嗯～…哈啊…啊啊～…嘴巴和手好像被火烫到了似的…嗯～嗯呜唔～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4918-4919',
        any: [/%SAVESTR:TARGET%把亀頭含在嘴里、不情愿的撸起了阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4920',
        any: [/「哈啊哈啊…啊姆～…啾～啾～…呗咯～…啊啊啊…这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4922-4923',
        any: [/\t\tCFLAG:TARGET:362 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4925-4927',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4928',
        any: [
          /%SAVESTR:TARGET%淫笑着用手握住阴茎、细致温柔地撸着并用嘴含住了亀頭。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4929',
        any: [
          /「我会很卖力的撸啦～…请将你的心意赏到%SELF_CALL\(TARGET\)%的嘴里吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4930',
        any: [
          /「嗯咻～…咻噜～…啾～啾唔呜唔%UNICODE\(0x2661\) \*1% 一撸起来…嘴里的大肉棒就一颤一颤的、好可爱～%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4931-4932',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4933',
        any: [/\t\t\tCFLAG:362 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4935',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:362 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4936',
        any: [
          /%SAVESTR:TARGET%脉脉含情的看着你、用嘴含住了亀頭开始撸起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4937',
        any: [
          /「啊啊啊…能为你做奉仕真开心…嗯唔～…啾～嘞噗～…嗯咕～…嗯呼呜…啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4938',
        any: [
          /「射出来…请全部射出来吧…那样%SELF_CALL\(TARGET\)%会很高兴的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4939-4940',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4941',
        any: [/\t\t\tCFLAG:362 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4943',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:362 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4944',
        any: [/%SAVESTR:TARGET%把亀頭含在嘴里、开始撸起了阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4945',
        any: [/「嗯～…哈啊…啊啊～…嘴巴和手好像被火烫到了似的…嗯～嗯呜唔～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4946-4947',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4948',
        any: [/\t\t\tCFLAG:362 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4950',
        any: [/\t\tELSEIF CFLAG:362 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4951',
        any: [/%SAVESTR:TARGET%把亀頭含在嘴里、不情愿的撸起了阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4952',
        any: [/「哈啊哈啊…啊姆～…啾～啾～…呗咯～…啊啊啊…这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4953',
        any: [/\t\t\tCFLAG:362 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4963-5018',
        any: [/^IF SELECTCOM == 127$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4963',
        any: [/IF SELECTCOM == 127/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4965',
        any: [/\tIF CFLAG:TARGET:363 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4967',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4968',
        any: [
          /%SAVESTR:TARGET%把阴茎吞入喉咙深处、发出下流的声音开始吮吸起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4969',
        any: [
          /「嗯咕呜～…嗯噗～…咻噜呜～咻噗～…咻～咻噜～呜呜呜呜%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4971',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4972',
        any: [/%SAVESTR:TARGET%把阴茎吞入喉咙深处、嗞嗞作响地吮吸起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4973',
        any: [
          /「咻噜呜～…啾～啾呜呜～%UNICODE\(0x2661\) \*1% 啊啊啊…大鸡鸡…真好嗤…啾呜～嘞噗～…噗啾呜呜～%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4975',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4976',
        any: [/%SAVESTR:TARGET%尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4977',
        any: [/「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4979-4980',
        any: [/%SAVESTR:TARGET%尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4981',
        any: [/「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4983-4984',
        any: [/\t\tCFLAG:TARGET:363 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4986-4988',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4989',
        any: [
          /%SAVESTR:TARGET%把阴茎吞入喉咙深处、发出下流的声音开始吮吸起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4990',
        any: [
          /「嗯咕呜～…嗯噗～…咻噜呜～咻噗～…咻～咻噜～呜呜呜呜%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4991',
        any: [
          /「全部…这大肉棒全部都是%SELF_CALL\(TARGET\)%的～%UNICODE\(0x2661\) \*1% 把精液满满的灌进喉咙里吧～…%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4992-4993',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4994',
        any: [/\t\t\tCFLAG:363 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4996',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4997',
        any: [/%SAVESTR:TARGET%把阴茎吞入喉咙深处、嗞嗞作响地吮吸起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4998',
        any: [
          /「哈姆呜～%UNICODE\(0x2661\) \*1% 嗯咕～%UNICODE\(0x2661\) \*1%嗯咻呜%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '4999',
        any: [
          /「大鸡鸡…全部都是%SELF_CALL\(TARGET\)%的～…哈姆呜～%UNICODE\(0x2661\) \*1% 嗯啾～啾～啾呜呜呜%UNIC/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5000-5001',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5002',
        any: [/\t\t\tCFLAG:363 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5004',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5005',
        any: [/%SAVESTR:TARGET%尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5006',
        any: [/「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5007-5008',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5009',
        any: [/\t\t\tCFLAG:363 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5011',
        any: [/\t\tELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5012',
        any: [/%SAVESTR:TARGET%尽量把阴茎含进喉咙深处、嗞嗞作响地吮吸起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5013',
        any: [/「嗯咕呜呜～…嗯～…嗯唔～…嗯～唔呜唔～…唔呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5014',
        any: [/\t\t\tCFLAG:363 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5023-5076',
        any: [/^IF SELECTCOM == 69$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5023',
        any: [/IF SELECTCOM == 69/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5025',
        any: [/\tIF CFLAG:TARGET:364 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5027',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5028',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪的亲吻着两腿之间。%SAVESTR:TARGET%每当私处被刺激就/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5029',
        any: [
          /「嗯呜唔～%UNICODE\(0x2661\) \*1% …继续欺负我～…我也会继续舔肉棒的～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5031',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5032',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪的亲吻着两腿之间。%SAVESTR:TARGET%一边承受着私处传/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5033',
        any: [
          /「啊啊～…那里一被欺负…啊～啊啊～%UNICODE\(0x2661\) \*1% 就没法好好奉仕大鸡鸡了～～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5035',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5036',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪的亲吻着两腿之间。%SAVESTR:TARGET%因为私处传来的刺/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5037',
        any: [
          /「嗯咕～…嗯～…哈啊啊…被这样逗弄的话…奉仕就…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5039-5040',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪的亲吻着两腿之间。%SAVESTR:TARGET%由于私处传来的刺/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5041',
        any: [/「啊啊～…不行～…这样不行～…啊～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5043-5044',
        any: [/\t\tCFLAG:TARGET:364 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5046-5048',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5049',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪的亲吻着两腿之间。%SAVESTR:TARGET%每当私处被刺激就/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5050',
        any: [
          /「嗯呜唔～%UNICODE\(0x2661\) \*1% …继续欺负我～…我也会继续舔肉棒的～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5051-5052',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5053',
        any: [/\t\t\tCFLAG:364 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5055',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:364 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5056',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪的亲吻着两腿之间。%SAVESTR:TARGET%一边承受着私处传/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5057',
        any: [
          /「啊啊～…那里一被欺负…啊～啊啊～%UNICODE\(0x2661\) \*1% 就没法好好奉仕大肉棒了～～%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5058-5059',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5060',
        any: [/\t\t\tCFLAG:364 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5062',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:364 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5063',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪的亲吻着两腿之间。%SAVESTR:TARGET%因为私处传来的刺/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5064',
        any: [
          /「嗯咕～…嗯～…哈啊啊…被这样逗弄的话…奉仕就…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5065-5066',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5067',
        any: [/\t\t\tCFLAG:364 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5069',
        any: [/\t\tELSEIF CFLAG:364 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5070',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪的亲吻着两腿之间。%SAVESTR:TARGET%由于私处传来的刺/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5071',
        any: [/「啊啊～…不行～…这样不行～…啊～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5072',
        any: [/\t\t\tCFLAG:364 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5081-5138',
        any: [/^IF SELECTCOM == 124$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5081',
        any: [/IF SELECTCOM == 124/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5083',
        any: [/\tIF CFLAG:TARGET:365 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5085',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5086',
        any: [/%SAVESTR:TARGET%把阴茎吞入喉咙深处、用嘴唇紧紧含着根部。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5087',
        any: [
          /「嗯噗呜唔…嗯咻噜～咻噜…咻噜噗呜～%UNICODE\(0x2661\) \*1% 咻噜～咻～咻噗呜%UNICODE\(0x2661\) \*1%…嗯咕/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5089',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5090',
        any: [
          /%SAVESTR:TARGET%把阴茎吞入喉咙深处、一边吸一边发出了下流的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5091',
        any: [
          /「咻噗～咻噜～…嗯～嗯～…咻噜～呜～%UNICODE\(0x2661\) \*1% 嘞噗～…嗯咕～%UNICODE\(0x2661\) \*1% 嗯嗯嗯/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5093',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5094',
        any: [
          /%SAVESTR:TARGET%尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5095',
        any: [
          /「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？…嗯唔～…嗯姆呜…嘞咯～噢…嗯～嗯～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5097-5098',
        any: [
          /%SAVESTR:TARGET%尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5099',
        any: [/「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5101-5102',
        any: [/\t\tCFLAG:TARGET:365 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5104-5106',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5107',
        any: [/%SAVESTR:TARGET%把阴茎吞入喉咙深处、用嘴唇紧紧含着根部。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5108',
        any: [
          /「嗯噗呜唔…嗯咻噜～咻噜…咻噜噗呜～%UNICODE\(0x2661\) \*1% 咻噜～咻～咻噗呜%UNICODE\(0x2661\) \*1%…嗯咕/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5109',
        any: [/（喉咙里面…被肉棒塞得满满的…好开心…%UNICODE\(0x2661\) \*1%）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5110-5111',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5112',
        any: [/\t\t\tCFLAG:365 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5114',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5115',
        any: [
          /%SAVESTR:TARGET%把阴茎吞入喉咙深处、一边吸一边发出了下流的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5116',
        any: [
          /「咻噗～咻噜～…嗯～嗯～…咻噜～呜～%UNICODE\(0x2661\) \*1% 嘞噗～…嗯咕～%UNICODE\(0x2661\) \*1% 嗯嗯嗯/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5117',
        any: [
          /（啊啊～…连喉咙里面都被大鸡鸡侵犯了…好激动啊………%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5118-5119',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5120',
        any: [/\t\t\tCFLAG:365 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5122',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5123',
        any: [
          /%SAVESTR:TARGET%尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5124',
        any: [
          /「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？…嗯唔～…嗯姆呜…嘞咯～噢…嗯～嗯～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5125',
        any: [
          /（喉咙的里面也被插了～…嗯咕～…明明…很难受…%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5126-5127',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5128',
        any: [/\t\t\tCFLAG:365 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5130',
        any: [/\t\tELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5131',
        any: [
          /%SAVESTR:TARGET%尽量把阴茎含进喉咙深处、虽然好像喘不过气来但还是开始了口腔奉仕。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5132',
        any: [/「嗯唔～…嗯嗯～…嗯咻～…嗯噗呜～！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5133',
        any: [/\t\t\tCFLAG:365 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5143-5192',
        any: [/^IF SELECTCOM == 80$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5143',
        any: [/IF SELECTCOM == 80/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5145',
        any: [/\tIF CFLAG:TARGET:381 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5147',
        any: [/\t\tIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5148',
        any: [
          /「嗯噗呜呜～嗯咕～！？嗯～嗯呼呜呜～…嗯呼呜呜呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5149',
        any: [/%SAVESTR:TARGET%一边翻着白眼一边被鸡鸡插进了喉咙深处………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5151',
        any: [/\t\tELSEIF ABL:TARGET:16 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5152',
        any: [/「嗯呼呜～…嗯啾～…啾噗啊…嗯咕！？嗯呜唔～…嗯～…嗯～…嗯～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5153',
        any: [/%SAVESTR:TARGET%就这样被侵犯着口腔………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5155-5156',
        any: [
          /「嗯嗯嗯～～！？咕呼～…嗯咕呜呜～！？嗯～～嗯噗呜～…嗯咕～嗯咕～嗯咕呜呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5157',
        any: [/%SAVESTR:TARGET%被鸡鸡插进喉咙深处好像很痛苦的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5159-5160',
        any: [/\t\tCFLAG:TARGET:381 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5162-5164',
        any: [
          /\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 4 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5165',
        any: [
          /「嗯呜唔～…嗯～嗯噗…嗯咕～…嗯～嗯呼呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5166',
        any: [
          /「可以哦…%SELF_CALL\(TARGET\)%的嘴巴就是为了含住大肉棒而存在的…请随意使用吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5167',
        any: [
          /「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～%UNICODE\(0x2665\) \*1%嗯～%UNICODE\(0x2665\) \*1%嗯～%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5168-5169',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5170',
        any: [/\t\t\tCFLAG:381 = 5/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5172',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:381 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5173',
        any: [
          /「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～%UNICODE\(0x2665\) \*1%嗯～%UNICODE\(0x2665\) \*1%嗯～%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5174',
        any: [
          /「哈啊啊啊…让我…让我更多地奉仕你吧…嗯～！？嗯呼呜呜…嗯～嗯～嗯～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5175-5176',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5177',
        any: [/\t\t\tCFLAG:381 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5179',
        any: [
          /\t\tELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:381 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5180',
        any: [/「嗯咕呼呜…嗯噗～…嗯～嗯呜唔…嗯呜唔～…咳咳～咳咳～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5181',
        any: [/「哈啊…哈啊…对不起…下次会好好地…嗯呼呜呜呜！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5182-5183',
        any: [/\t\t\t\tSIF ABL:32 >= 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5184',
        any: [/\t\t\tCFLAG:381 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5186',
        any: [/\t\tELSEIF CFLAG:381 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5187',
        any: [
          /「嗯咕～…嗯～嗯噗…嗯噗…噗哈…咳咳～咳咳咳咳～…拜托…不要再继续了…嗯嗯～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5188',
        any: [/\t\t\tCFLAG:381 = 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5199',
        any: [/IF SELECTCOM == 87/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5199-5475',
        any: [/^IF SELECTCOM == 87$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5202',
        any: [/\tIF CFLAG:TARGET:348 == 0/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5204',
        any: [/\t\tIF ASSI > 0 && ASSIPLAY/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5205',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5207',
        any: [/\t\tELSEIF TALENT:TARGET:76 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5209',
        any: [/\t\t\tIF CFLAG:7 & P/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5210',
        any: [/%SAVESTR:TARGET%因为肌肤头一次被开洞而痛得禁不住悲鸣起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5212',
        any: [/\t\t\t\tIF P == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5213',
        any: [
          /「啊啊～！…哈啊…哈啊…这样一来乳头就可以拉伸了…请好好疼爱………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5214',
        any: [
          /%SAVESTR:TARGET%像为了展示因为痛苦而勃起的乳头和环似的挺起了胸部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5216',
        any: [/\t\t\t\tELSEIF P == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5217',
        any: [
          /「嗯～…额呵呵、不只是肚脐…我还想要更多的环%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5218',
        any: [/%SAVESTR:TARGET%这样说着用舌头舔了舔嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5220',
        any: [/\t\t\t\tELSEIF P == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5221',
        any: [
          /「啊啊～…好、好厉害…只是被风一吹…就感觉一颤一颤的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5222',
        any: [/%SAVESTR:TARGET%在阴唇上被穿了环、因为这一刺激而戦慄着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5224',
        any: [/\t\t\t\tELSEIF P == 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5225',
        any: [/\t\t\t\t\tIF TALENT:121 \|\| TALENT:122/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5226',
        any: [
          /「啊啊啊～…被这样弄的话会興奮过头的、会一直勃起的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5227',
        any: [/%SAVESTR:TARGET%在阴茎上被穿了环、阴茎持续地勃起着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5228-5229',
        any: [
          /「如何…这淫乱的环…这可是和淫乱的小穴相称的环哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5230',
        any: [
          /%SAVESTR:TARGET%像为了展示%阴核\(TARGET\)%上的环似的左右摇晃着腰身………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5233',
        any: [/\t\t\t\tELSEIF P == 16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5234',
        any: [
          /「嘻嘻…真想就这样舔舔大肉棒试试呢…嘞咯～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5235',
        any: [/%SAVESTR:TARGET%像为了展示舌尖上的环似的下流的舔了舔嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5237',
        any: [/\t\t\t\tELSEIF P == 32/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5238',
        any: [/「额呵呵～…很时尚吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5239',
        any: [/%SAVESTR:TARGET%舔着唇上的环好像在确认情况的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5241',
        any: [/\t\t\t\tELSEIF P == 64/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5242',
        any: [
          /「啊啊…%SELF_CALL\(TARGET\)%是为主人而生的、淫乱的母猪哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5243',
        any: [/%SAVESTR:TARGET%不停地翕动着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5246-5247',
        any: [/%SAVESTR:TARGET%抚摸着取掉环后留下的伤痕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5250',
        any: [/\t\tELSEIF TALENT:TARGET:85 == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5252',
        any: [/\t\t\tIF CFLAG:7 & P/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5253',
        any: [/%SAVESTR:TARGET%因为肌肤头一次被开洞而痛得小声地悲鸣起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5255',
        any: [/\t\t\t\tIF P == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5256',
        any: [
          /「啊啊…已经再也不会在主人面前一丝不挂了…啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5257',
        any: [/%SAVESTR:TARGET%装在勃起的双乳头上的环在闪闪发光………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5259',
        any: [/\t\t\t\tELSEIF P == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5260',
        any: [/「这就是所谓的时尚吧…嗯～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5261',
        any: [/%SAVESTR:TARGET%抚摸着被穿环的肚脐的周边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5263',
        any: [/\t\t\t\tELSEIF P == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5264',
        any: [/「啊啊啊～！请…请不要这样拉扯啊…咿～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5265',
        any: [/%SAVESTR:TARGET%因为被拉扯穿环而扩张开的阴唇而悲鳴起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5267',
        any: [/\t\t\t\tELSEIF P == 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5268',
        any: [/\t\t\t\t\tIF TALENT:121 \|\| TALENT:122/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5269',
        any: [
          /「%SELF_CALL\(TARGET\)%的鸡鸡…变的…这么漂亮了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5270',
        any: [/%SAVESTR:TARGET%的鸡鸡因为被穿环的痛楚与兴奋而挺立起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5271-5272',
        any: [
          /「啊啊…这种地方被穿了环的话…%SELF_CALL\(TARGET\)%…就没办法不去想主人的事情了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5273',
        any: [/%SAVESTR:TARGET%因为阴蒂被穿环而兴奋不已的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5276',
        any: [/\t\t\t\tELSEIF P == 16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5277',
        any: [
          /「呐…亲我～…有点担心能不能和主人好好接吻呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5278',
        any: [/%SAVESTR:TARGET%咂着被穿环的舌头蠢蠢欲动的诱惑着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5280',
        any: [/\t\t\t\tELSEIF P == 32/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5281',
        any: [/「呐…请亲亲我的嘴唇吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5282',
        any: [/%SAVESTR:TARGET%舔着唇上的环好像在确认情况的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5284',
        any: [/\t\t\t\tELSEIF P == 64/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5285',
        any: [
          /「啊啊…%SELF_CALL\(TARGET\)%是主人的母猪～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5286',
        any: [/%SAVESTR:TARGET%因为被穿了鼻环而兴奋地喘着粗气………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5289-5290',
        any: [/%SAVESTR:TARGET%好像有点寂寞的抚摸着取掉环后的伤痕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5293-5295',
        any: [/\t\t\tIF CFLAG:7 & P/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5296',
        any: [
          /%SAVESTR:TARGET%因为肌肤头一次被开洞而痛得悲鸣起来、流下了眼泪。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5298',
        any: [/\t\t\t\tIF P == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5299',
        any: [/「竟然…%SELF_CALL\(TARGET\)%竟然被这样的侮辱了…呜呜～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5300',
        any: [/%SAVESTR:TARGET%因为乳头被穿环的痛楚而流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5302',
        any: [/\t\t\t\tELSEIF P == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5303',
        any: [/「呜呜～…痛、好痛………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5304',
        any: [/%SAVESTR:TARGET%因为肚脐被穿环的痛楚而泪流满面………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5306',
        any: [/\t\t\t\tELSEIF P == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5307',
        any: [/「啊啊～…取下来…快取下来…已经…受不了了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5308',
        any: [/%SAVESTR:TARGET%因为阴唇被穿环的痛苦而流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5310',
        any: [/\t\t\t\tELSEIF P == 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5311',
        any: [/\t\t\t\t\tIF TALENT:121 \|\| TALENT:122/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5312',
        any: [
          /「请、请不要再做这种事情了…啊啊～…为什么…要做这种亵渎的事…呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5313',
        any: [/%SAVESTR:TARGET%因为鸡鸡被穿环的痛楚不停地流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5314-5315',
        any: [/「啊啊～…请把环取下来吧…好痛…要疯了…呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5316',
        any: [/%SAVESTR:TARGET%因为阴蒂被穿环的痛楚不停地流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5319',
        any: [/\t\t\t\tELSEIF P == 16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5320',
        any: [/「讨厌…舌环…请取下来吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5321',
        any: [/%SAVESTR:TARGET%的舌尖被穿了环、痛的流下泪来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5323',
        any: [/\t\t\t\tELSEIF P == 32/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5324',
        any: [/「够了…请饶了我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5325',
        any: [/%SAVESTR:TARGET%的唇被穿了环、流下了屈辱的泪水………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5327',
        any: [/\t\t\t\tELSEIF P == 64/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5328',
        any: [/「%SELF_CALL\(TARGET\)%才不是…你说的什么母猪…呜呜呜～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5329',
        any: [
          /%SAVESTR:TARGET%不想被看到鼻环似的毫不犹豫的背过脸去流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5332-5333',
        any: [/%SAVESTR:TARGET%擦拭着取下环后的伤痕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5336-5337',
        any: [/\t\tCFLAG:TARGET:348 = 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5339-5341',
        any: [/\t\tIF ASSI > 0 && ASSIPLAY/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5342',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5344',
        any: [
          /\t\tELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:348 <= 3 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5346',
        any: [/\t\t\tIF CFLAG:7 & P/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5348',
        any: [/\t\t\t\tIF P == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5349',
        any: [
          /「啊啊～！…哈啊…哈啊…这样一来乳头就可以拉伸了…请好好疼爱………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5350',
        any: [
          /%SAVESTR:TARGET%像为了展示因为痛苦而勃起的乳头和环似的挺起了胸部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5352',
        any: [/\t\t\t\tELSEIF P == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5353',
        any: [
          /「嗯～…额呵呵、不只是肚脐…我还想要更多的环%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5354',
        any: [/%SAVESTR:TARGET%这样说着用舌头舔了舔嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5356',
        any: [/\t\t\t\tELSEIF P == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5357',
        any: [
          /「啊啊～…好、好厉害…只是被风一吹…就感觉一颤一颤的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5358',
        any: [/%SAVESTR:TARGET%在阴唇上被穿了环、因为这一刺激而戦慄着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5360',
        any: [/\t\t\t\tELSEIF P == 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5361',
        any: [/\t\t\t\t\tIF TALENT:121 \|\| TALENT:122/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5362',
        any: [
          /「啊啊啊～…被这样弄的话会興奮过头的、会一直勃起的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5363',
        any: [/%SAVESTR:TARGET%在阴茎上被穿了环、阴茎持续地勃起着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5364-5365',
        any: [
          /「如何…这淫乱的环…这可是和淫乱的小穴相称的环哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5366',
        any: [
          /%SAVESTR:TARGET%像为了展示%阴核\(TARGET\)%上的环似的左右摇晃着腰身………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5369',
        any: [/\t\t\t\tELSEIF P == 16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5370',
        any: [
          /「嘻嘻…真想就这样舔舔大肉棒试试呢…嘞咯～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5371',
        any: [/%SAVESTR:TARGET%像为了展示舌尖上的环似的下流的舔了舔嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5373',
        any: [/\t\t\t\tELSEIF P == 32/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5374',
        any: [/「额呵呵～…很时尚吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5375',
        any: [/%SAVESTR:TARGET%舔着唇上的环好像在确认情况的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5377',
        any: [/\t\t\t\tELSEIF P == 64/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5378',
        any: [
          /「啊啊…%SELF_CALL\(TARGET\)%是为主人而生的、淫乱的母猪哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5379',
        any: [/%SAVESTR:TARGET%不停地翕动着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5382-5383',
        any: [/%SAVESTR:TARGET%抚摸着取掉环后留下的伤痕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5385',
        any: [/\t\t\tCFLAG:348 = 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5387',
        any: [
          /\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:348 <= 2 \|\| FLAG:7 == 2\)/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5389',
        any: [/\t\t\tIF CFLAG:7 & P/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5391',
        any: [/\t\t\t\tIF P == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5392',
        any: [
          /「啊啊…已经再也不会在主人面前一丝不挂了…啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5393',
        any: [/%SAVESTR:TARGET%装在勃起的双乳上的环在闪闪发光………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5395',
        any: [/\t\t\t\tELSEIF P == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5396',
        any: [/「额呵呵、好像很时尚呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5397',
        any: [/%SAVESTR:TARGET%抚摸着被穿环的肚脐的周边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5399',
        any: [/\t\t\t\tELSEIF P == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5400',
        any: [/「啊啊啊～！请…请不要这样拉扯啊…咿～～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5401',
        any: [/%SAVESTR:TARGET%因为被拉扯穿环而扩张开的阴唇而悲鳴起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5403',
        any: [/\t\t\t\tELSEIF P == 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5404',
        any: [/\t\t\t\t\tIF TALENT:121 \|\| TALENT:122/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5405',
        any: [
          /「%SELF_CALL\(TARGET\)%的鸡鸡…变的…这么漂亮了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5406',
        any: [/%SAVESTR:TARGET%的鸡鸡因为被穿环的痛楚与兴奋而挺立起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5407-5408',
        any: [
          /「啊啊…这种地方被穿了环的话…%SELF_CALL\(TARGET\)%…就没办法不去想主人的事情了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5409',
        any: [/%SAVESTR:TARGET%因为阴蒂被穿环而兴奋不已的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5412',
        any: [/\t\t\t\tELSEIF P == 16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5413',
        any: [
          /「呐…亲我～…有点担心能不能和主人好好接吻呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5414',
        any: [/%SAVESTR:TARGET%咂着被穿环的舌头蠢蠢欲动的诱惑着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5416',
        any: [/\t\t\t\tELSEIF P == 32/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5417',
        any: [/「呐…请亲亲我的嘴唇吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5418',
        any: [/%SAVESTR:TARGET%舔着唇上的环好像在确认情况的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5420',
        any: [/\t\t\t\tELSEIF P == 64/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5421',
        any: [
          /「啊啊…%SELF_CALL\(TARGET\)%是主人的母猪～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5422',
        any: [/%SAVESTR:TARGET%因为被穿了鼻环而兴奋地喘着粗气………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5425-5426',
        any: [/%SAVESTR:TARGET%好像有点寂寞的抚摸着取掉环后的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5428',
        any: [/\t\t\tCFLAG:348 = 3/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5430',
        any: [/\t\tELSEIF CFLAG:348 <= 1 \|\| FLAG:7 == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5432',
        any: [/\t\t\tIF CFLAG:7 & P/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5434',
        any: [/\t\t\t\tIF P == 1/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5435',
        any: [/「竟然…%SELF_CALL\(TARGET\)%竟然被这样的侮辱了…呜呜～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5436',
        any: [/%SAVESTR:TARGET%因为乳头被穿环的痛楚而屈辱地流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5438',
        any: [/\t\t\t\tELSEIF P == 2/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5439',
        any: [/「呜呜～…痛、好痛………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5440',
        any: [/%SAVESTR:TARGET%因为肚脐被穿环的痛楚而泪流满面………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5442',
        any: [/\t\t\t\tELSEIF P == 4/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5443',
        any: [/「啊啊～…取下来…快取下来…已经…受不了了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5444',
        any: [/%SAVESTR:TARGET%因为阴唇被穿环的痛苦而流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5446',
        any: [/\t\t\t\tELSEIF P == 8/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5447',
        any: [/\t\t\t\t\tIF TALENT:121 \|\| TALENT:122/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5448',
        any: [
          /「请、请不要再做这种事情了…啊啊～…为什么…要做这种亵渎的事…呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5449',
        any: [/%SAVESTR:TARGET%因为鸡鸡被穿环的痛楚不停地流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5450-5451',
        any: [/「啊啊～…请把环取下来吧…好痛…要疯了…呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5452',
        any: [/%SAVESTR:TARGET%因为阴蒂被穿环的痛楚不停地流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5455',
        any: [/\t\t\t\tELSEIF P == 16/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5456',
        any: [/「讨厌…舌环…请取下来吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5457',
        any: [/%SAVESTR:TARGET%的舌尖被穿了环、痛的流下泪来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5459',
        any: [/\t\t\t\tELSEIF P == 32/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5460',
        any: [/「够了…请饶了我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5461',
        any: [/%SAVESTR:TARGET%的唇被穿了环、流下了屈辱的泪水………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5463',
        any: [/\t\t\t\tELSEIF P == 64/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5464',
        any: [/「%SELF_CALL\(TARGET\)%才不是…你说的什么母猪…呜呜呜～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5465',
        any: [
          /%SAVESTR:TARGET%不想被看到鼻环似的毫不犹豫的背过脸去流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5468-5469',
        any: [/%SAVESTR:TARGET%擦拭着取下环后的伤痕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K0_慈愛.ERB',
        ref: '5471',
        any: [/\t\t\tCFLAG:348 = 2/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
