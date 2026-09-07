// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #344：ere/dungeon/ex-item.js。

const SOURCE = 'target/ERB/其他/USE_EX_ITEM.ERB';

export const FILES = [
  {
    js: 'ere/dungeon/ex-item.js',
    refs: [
      { src: SOURCE, ref: '4-71', any: [/@USE_EX_ITEM,ARGS/] },
      { src: SOURCE, ref: '74-124', any: [/@SELL_EX_ITEM,ARG/] },
      {
        src: SOURCE,
        ref: '127-244',
        any: [/@ADD_EX_ITEM, ARG:0, ARG:1, ARG:2/],
      },
      { src: SOURCE, ref: '331-996', any: [/@HARB_ITEM, ARG:0/] },
      { src: SOURCE, ref: '999-1010', any: [/@EX_ITEM_NAME,ARG:0/] },
      { src: SOURCE, ref: '331-370', any: [/@HARB_ITEM, ARG:0/] },
      { src: SOURCE, ref: '373-411', any: [/@POTION_ITEM, ARG:0/] },
      { src: SOURCE, ref: '414-468', any: [/@HEAL_ROD_ITEM, ARG:0/] },
      { src: SOURCE, ref: '471-532', any: [/@MIND_ROD_ITEM, ARG:0/] },
      { src: SOURCE, ref: '535-584', any: [/@POWER_SEED_ITEM, ARG:0/] },
      { src: SOURCE, ref: '587-632', any: [/@DEF_SEED_ITEM, ARG:0/] },
      { src: SOURCE, ref: '635-671', any: [/@EXP_MEDAL_ITEM, ARG:0/] },
      { src: SOURCE, ref: '674-724', any: [/@HP_SEED_ITEM, ARG:0/] },
      { src: SOURCE, ref: '727-772', any: [/@MP_SEED_ITEM, ARG:0/] },
      { src: SOURCE, ref: '775-812', any: [/@EXP_SILVER_ITEM, ARG:0/] },
      { src: SOURCE, ref: '815-871', any: [/@DETOX_WORM_ITEM,ARG/] },
      { src: SOURCE, ref: '874-901', any: [/@JUEL_BOX_ITEM,ARG/] },
      { src: SOURCE, ref: '904-951', any: [/@INVISIBLE_POTION_ITEM,ARG/] },
      { src: SOURCE, ref: '954-996', any: [/@HERO_POTION_ITEM, ARG:0/] },
      { src: SOURCE, ref: '95-97', any: [/SIF RAND:10 == 0/] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
