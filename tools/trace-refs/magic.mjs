// 源: tools/trace-check.mjs  @FILES
// issue #343：MAGIC.ERB 十八个函数整文件移植。

const SRC = 'target/ERB/其他/MAGIC.ERB';

export const FILES = [
  {
    js: 'ere/dungeon/magic.js',
    refs: [
      { src: SRC, ref: '5-46', any: [/^@MAGIC,TARGET_TYPE$/m] },
      { src: SRC, ref: '47-75', any: [/^@MAGIC_USE,ARG,TARGET_TYPE$/m] },
      { src: SRC, ref: '76-143', any: [/^@MAGIC_SELECT,TARGET_TYPE$/m] },
      { src: SRC, ref: '144-214', any: [/^@SHAMAN_SELECT,TARGET_TYPE$/m] },
      {
        src: SRC,
        ref: '215-237',
        any: [/^@MAGIC_DAMAGE_CAP,CHARA_LV,ENEMY_LV,DAMAGE,DMG_CAP$/m],
      },
      {
        src: SRC,
        ref: '238-275',
        any: [/^@MAGIC_BONUS_C_TO_M,CHARA,DAMAGE$/m],
      },
      {
        src: SRC,
        ref: '276-331',
        any: [/^@MAGIC_BONUS_M_TO_C,CHARA,DAMAGE$/m],
      },
      {
        src: SRC,
        ref: '332-381',
        any: [/^@MAGIC_BONUS_C_TO_C,CHARA,DAMAGE,DEF_CHARA$/m],
      },
      { src: SRC, ref: '382-436', any: [/^@TELEPORT_MAGIC,TARGET_TYPE$/m] },
      { src: SRC, ref: '437-557', any: [/^@SLEEP_MAGIC,TARGET_TYPE$/m] },
      {
        src: SRC,
        ref: '558-644',
        any: [/^@ENERGY_BOLT_MAGIC,TARGET_TYPE$/m],
      },
      {
        src: SRC,
        ref: '645-740',
        any: [/^@ENERGY_DRAIN_MAGIC,TARGET_TYPE$/m],
      },
      { src: SRC, ref: '741-827', any: [/^@FIREBALL_MAGIC,TARGET_TYPE$/m] },
      { src: SRC, ref: '828-914', any: [/^@HEAL_MAGIC,TARGET_TYPE$/m] },
      { src: SRC, ref: '915-968', any: [/^@SHIELD_MAGIC$/m] },
      { src: SRC, ref: '969-1081', any: [/^@CURSE_MAGIC,TARGET_TYPE$/m] },
      {
        src: SRC,
        ref: '1082-1176',
        any: [/^@MIND_DRAIN_MAGIC,TARGET_TYPE$/m],
      },
      { src: SRC, ref: '1177-1315', any: [/^@LV_DRAIN_MAGIC,TARGET_TYPE$/m] },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
