// GENERATED START
const era = require('#/era-electron');

const item_variable_names = {
  0: "vibrating_gem",
  1: "pot_worm",
  2: "vibrating_rod",
  3: "anal_worm",
  4: "dildo",
  5: "blindfold",
  6: "crystal_ball",
  7: "clitoris_clamp",
  8: "nipple_clamp",
  9: "gag",
  10: "torture_whip",
  11: "needle",
  12: "onahole",
  13: "floor_mat",
  14: "rope",
  15: "enema_plug",
  16: "big_mirror",
  17: "milking_machine",
  18: "collar",
  19: "apron",
  20: "anal_beads",
  21: "electrode_clip",
  22: "stray_dog",
  23: "straitjacket",
  24: "condom",
  25: "lubricant",
  26: "aphrodisiac",
  27: "diuretic",
  28: "crystal_ball_mana",
  29: "deworming_drug",
  30: "nutrient",
  31: "incense",
  33: "wg_battery",
  34: "piercing_kit",
  35: "spectator_ticket",
  37: "affection_meter",
  38: "charm_scale_armor",
  39: "demon_knowledge_book",
  40: "ovulation_drug",
  41: "hair_growth_agent",
  42: "mixing_knowledge_book",
  52: "technique_level_book",
  53: "experience_book",
  54: "succubus_knowledge_book",
  55: "trap_level_book",
  56: "bug_knowledge_book",
  60: "pitfall",
  61: "arrow_trap",
  62: "teleport_trap",
  63: "one_way_trap",
  64: "arousal_trap",
  65: "tentacle_floor_trap",
  66: "aphrodisiac_mire_trap",
  67: "masturbation_hypno_trap",
  68: "mimic_room_trap",
  69: "summon_trap",
  70: "nightmare_trap",
  71: "slime_room_trap",
  72: "spider_web",
  73: "dishonest_merchant",
  74: "dark_trap",
  75: "catapult",
  76: "mana_diffusion_trap",
  77: "oil_pot_trap",
  78: "rocket_launcher_trap",
  79: "anal_worm_trap",
  80: "lewd_worm_trap",
  81: "gem_trap",
  82: "attack_boost_trap",
  83: "defense_boost_trap",
  84: "magic_damage_trap",
  85: "ghost_hand_trap",
  87: "scam_trap",
  90: "tentacle_creature",
  91: "ornamental_ring",
  100: "kobold",
  101: "goblin",
  102: "viscous_monster",
  103: "dragon_head_fly",
  104: "zombie",
  110: "orc",
  111: "bugbear",
  112: "vine_monster",
  113: "zombie_bug",
  114: "zombie_hound",
  120: "lizardman",
  121: "ogre",
  122: "armor_eater",
  123: "pixie",
  124: "venomous_centipede",
  130: "troll",
  131: "gargoyle",
  132: "imp",
  133: "warlock",
  134: "banshee",
  140: "lesser_demon",
  141: "hellhound",
  142: "slime",
  143: "witch",
  144: "bloodsucking_tree",
  150: "giant",
  151: "chimera",
  152: "succubus",
  153: "male_priest",
  154: "night_girl",
  160: "female_ninja",
  161: "dark_knight",
  162: "brain_eater",
  163: "priestess",
  164: "sprite",
  170: "ninja",
  171: "dullahan",
  172: "vampire",
  173: "ghost",
  174: "death_scorpion",
  180: "arch_demon",
  181: "death_lord",
  182: "lilith",
  183: "nightmare",
  184: "beholder",
  190: "skeleton",
  191: "dark_savior",
  192: "nine_tails",
  193: "chaos_dragon",
  201: "elite_slime",
  202: "elite_kobold",
  203: "elite_ant",
  204: "elite_sprout",
  205: "elite_siren",
  206: "elite_pixie",
  207: "giant_chief",
  208: "elite_demon",
  209: "elite_fiend",
  210: "hound_leader",
  211: "otherworld_hero",
  300: "decorative_ring",
  301: "destruction_ring",
  302: "guardian_ring",
  303: "speed_ring",
  304: "regeneration_ring",
  305: "will_ring",
  306: "desire_ring",
  307: "power_ring",
  308: "toughness_ring",
  309: "domination_ring",
  310: "growth_ring",
  311: "weakness_ring",
  312: "sluggish_ring",
  313: "death_ring",
  314: "debility_ring",
  315: "brainwash_ring",
  316: "trap_avoid_ring",
  317: "invasion_ring",
  318: "barrier_ring",
  319: "trial_ring",
  320: "misfortune_ring",
  340: "sword",
  341: "staff",
  342: "whip",
  343: "dagger",
  344: "shuriken",
  345: "bow",
  346: "scepter",
  347: "war_hammer",
  348: "scythe",
  349: "tentacle",
  350: "rapier",
  351: "glaive",
  352: "knuckle",
  400: "herb",
  401: "healing_potion",
  402: "healing_staff",
  403: "spirit_staff",
  404: "seed_of_power",
  405: "seed_of_guard",
  406: "exp_coin",
  407: "seed_of_life",
  408: "seed_of_heart",
  409: "exp_silver_coin",
  410: "holy_water",
  411: "corrupt_gem_box",
  412: "invisibility_potion",
  413: "hero_potion",
  500: "shopping_street",
  501: "swamp",
  502: "human_ranch",
  503: "ice_room",
  504: "hot_sand",
  505: "labyrinth",
  506: "museum",
  507: "brothel_street",
  600: "barbarian",
  601: "giant_ant",
  602: "red_skin_orc",
  603: "man_eating_flower",
  604: "gorilla",
  605: "totem_girl",
  606: "elephant",
  607: "crimson_shaman",
  608: "troll_mage",
  609: "forest_dragon",
  1005: "crusader_warrior",
  1006: "crusader_priest",
  1007: "crusader_knight",
  1008: "crusader_mage",
  1009: "crusader_hunter",
};

const era_item = {
  /** 振动宝石 */
  "vibrating_gem": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][0];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][0] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][0];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][0] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][0];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][0] = v;
    },
  },
  /** 壶虫 */
  "pot_worm": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][1];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][1] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][1];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][1] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][1];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][1] = v;
    },
  },
  /** 振动杖 */
  "vibrating_rod": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][2];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][2] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][2];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][2] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][2];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][2] = v;
    },
  },
  /** 肛门虫 */
  "anal_worm": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][3];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][3] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][3];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][3] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][3];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][3] = v;
    },
  },
  /** 假阳具 */
  "dildo": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][4];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][4] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][4];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][4] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][4];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][4] = v;
    },
  },
  /** 眼罩 */
  "blindfold": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][5];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][5] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][5];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][5] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][5];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][5] = v;
    },
  },
  /** 水晶球 */
  "crystal_ball": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][6];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][6] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][6];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][6] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][6];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][6] = v;
    },
  },
  /** 阴蒂夹 */
  "clitoris_clamp": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][7];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][7] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][7];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][7] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][7];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][7] = v;
    },
  },
  /** 乳头夹 */
  "nipple_clamp": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][8];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][8] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][8];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][8] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][8];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][8] = v;
    },
  },
  /** 口塞 */
  "gag": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][9];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][9] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][9];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][9] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][9];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][9] = v;
    },
  },
  /** 鞭 */
  "torture_whip": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][10];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][10] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][10];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][10] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][10];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][10] = v;
    },
  },
  /** 针 */
  "needle": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][11];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][11] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][11];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][11] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][11];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][11] = v;
    },
  },
  /** 飞机杯 */
  "onahole": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][12];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][12] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][12];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][12] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][12];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][12] = v;
    },
  },
  /** 地垫 */
  "floor_mat": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][13];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][13] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][13];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][13] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][13];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][13] = v;
    },
  },
  /** 绳子 */
  "rope": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][14];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][14] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][14];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][14] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][14];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][14] = v;
    },
  },
  /** 灌肠+肛塞 */
  "enema_plug": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][15];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][15] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][15];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][15] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][15];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][15] = v;
    },
  },
  /** 大镜子 */
  "big_mirror": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][16];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][16] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][16];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][16] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][16];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][16] = v;
    },
  },
  /** 榨乳器 */
  "milking_machine": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][17];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][17] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][17];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][17] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][17];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][17] = v;
    },
  },
  /** 项圈 */
  "collar": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][18];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][18] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][18];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][18] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][18];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][18] = v;
    },
  },
  /** 围裙 */
  "apron": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][19];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][19] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][19];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][19] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][19];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][19] = v;
    },
  },
  /** 肛珠 */
  "anal_beads": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][20];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][20] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][20];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][20] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][20];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][20] = v;
    },
  },
  /** 电极接头 */
  "electrode_clip": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][21];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][21] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][21];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][21] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][21];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][21] = v;
    },
  },
  /** 野狗 */
  "stray_dog": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][22];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][22] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][22];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][22] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][22];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][22] = v;
    },
  },
  /** 拘束衣 */
  "straitjacket": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][23];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][23] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][23];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][23] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][23];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][23] = v;
    },
  },
  /** 安全套 */
  "condom": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][24];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][24] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][24];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][24] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][24];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][24] = v;
    },
  },
  /** 润滑液 */
  "lubricant": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][25];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][25] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][25];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][25] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][25];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][25] = v;
    },
  },
  /** 媚药 */
  "aphrodisiac": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][26];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][26] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][26];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][26] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][26];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][26] = v;
    },
  },
  /** 利尿剂 */
  "diuretic": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][27];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][27] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][27];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][27] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][27];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][27] = v;
    },
  },
  /** 水晶球魔力源 */
  "crystal_ball_mana": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][28];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][28] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][28];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][28] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][28];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][28] = v;
    },
  },
  /** 打虫药 */
  "deworming_drug": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][29];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][29] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][29];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][29] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][29];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][29] = v;
    },
  },
  /** 营养剂 */
  "nutrient": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][30];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][30] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][30];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][30] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][30];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][30] = v;
    },
  },
  /** 熏香 */
  "incense": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][31];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][31] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][31];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][31] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][31];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][31] = v;
    },
  },
  /** ｗｇ电池 */
  "wg_battery": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][33];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][33] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][33];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][33] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][33];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][33] = v;
    },
  },
  /** 穿孔工具 */
  "piercing_kit": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][34];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][34] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][34];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][34] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][34];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][34] = v;
    },
  },
  /** 观战卷 */
  "spectator_ticket": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][35];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][35] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][35];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][35] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][35];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][35] = v;
    },
  },
  /** 好感测定仪 */
  "affection_meter": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][37];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][37] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][37];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][37] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][37];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][37] = v;
    },
  },
  /** 魅力鳞甲 */
  "charm_scale_armor": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][38];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][38] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][38];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][38] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][38];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][38] = v;
    },
  },
  /** 【魔界知识】 */
  "demon_knowledge_book": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][39];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][39] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][39];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][39] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][39];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][39] = v;
    },
  },
  /** 排卵诱发剂 */
  "ovulation_drug": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][40];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][40] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][40];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][40] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][40];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][40] = v;
    },
  },
  /** 生毛剂 */
  "hair_growth_agent": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][41];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][41] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][41];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][41] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][41];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][41] = v;
    },
  },
  /** 【调合知识】 */
  "mixing_knowledge_book": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][42];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][42] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][42];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][42] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][42];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][42] = v;
    },
  },
  /** 【技巧等级】 */
  "technique_level_book": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][52];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][52] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][52];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][52] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][52];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][52] = v;
    },
  },
  /** 【经验值】 */
  "experience_book": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][53];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][53] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][53];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][53] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][53];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][53] = v;
    },
  },
  /** 【淫魔知识】 */
  "succubus_knowledge_book": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][54];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][54] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][54];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][54] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][54];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][54] = v;
    },
  },
  /** 【陷阱等级】 */
  "trap_level_book": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][55];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][55] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][55];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][55] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][55];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][55] = v;
    },
  },
  /** 【魔虫知识】 */
  "bug_knowledge_book": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][56];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][56] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][56];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][56] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][56];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][56] = v;
    },
  },
  /** 落穴 */
  "pitfall": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][60];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][60] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][60];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][60] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][60];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][60] = v;
    },
  },
  /** 射箭陷阱 */
  "arrow_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][61];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][61] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][61];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][61] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][61];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][61] = v;
    },
  },
  /** 传送陷阱 */
  "teleport_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][62];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][62] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][62];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][62] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][62];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][62] = v;
    },
  },
  /** 单向通行陷阱 */
  "one_way_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][63];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][63] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][63];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][63] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][63];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][63] = v;
    },
  },
  /** 催淫陷阱 */
  "arousal_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][64];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][64] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][64];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][64] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][64];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][64] = v;
    },
  },
  /** 触手地板陷阱 */
  "tentacle_floor_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][65];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][65] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][65];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][65] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][65];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][65] = v;
    },
  },
  /** 媚药泥沼陷阱 */
  "aphrodisiac_mire_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][66];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][66] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][66];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][66] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][66];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][66] = v;
    },
  },
  /** 自慰催眠陷阱 */
  "masturbation_hypno_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][67];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][67] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][67];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][67] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][67];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][67] = v;
    },
  },
  /** 拟态房间陷阱 */
  "mimic_room_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][68];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][68] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][68];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][68] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][68];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][68] = v;
    },
  },
  /** 召唤陷阱 */
  "summon_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][69];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][69] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][69];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][69] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][69];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][69] = v;
    },
  },
  /** 梦魔陷阱 */
  "nightmare_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][70];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][70] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][70];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][70] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][70];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][70] = v;
    },
  },
  /** 史莱姆房间陷阱 */
  "slime_room_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][71];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][71] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][71];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][71] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][71];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][71] = v;
    },
  },
  /** 蜘蛛网 */
  "spider_web": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][72];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][72] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][72];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][72] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][72];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][72] = v;
    },
  },
  /** 奸商 */
  "dishonest_merchant": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][73];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][73] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][73];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][73] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][73];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][73] = v;
    },
  },
  /** 黑暗的陷阱 */
  "dark_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][74];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][74] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][74];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][74] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][74];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][74] = v;
    },
  },
  /** 弹射 */
  "catapult": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][75];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][75] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][75];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][75] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][75];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][75] = v;
    },
  },
  /** 魔力扩散陷阱 */
  "mana_diffusion_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][76];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][76] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][76];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][76] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][76];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][76] = v;
    },
  },
  /** 油壶陷阱 */
  "oil_pot_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][77];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][77] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][77];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][77] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][77];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][77] = v;
    },
  },
  /** 火箭发射陷阱 */
  "rocket_launcher_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][78];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][78] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][78];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][78] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][78];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][78] = v;
    },
  },
  /** 肛门虫陷阱 */
  "anal_worm_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][79];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][79] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][79];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][79] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][79];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][79] = v;
    },
  },
  /** 淫虫陷阱 */
  "lewd_worm_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][80];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][80] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][80];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][80] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][80];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][80] = v;
    },
  },
  /** 宝石陷阱 */
  "gem_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][81];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][81] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][81];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][81] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][81];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][81] = v;
    },
  },
  /** 攻击效果陷阱 */
  "attack_boost_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][82];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][82] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][82];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][82] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][82];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][82] = v;
    },
  },
  /** 防御效果陷阱 */
  "defense_boost_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][83];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][83] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][83];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][83] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][83];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][83] = v;
    },
  },
  /** 魔法伤害陷阱 */
  "magic_damage_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][84];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][84] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][84];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][84] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][84];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][84] = v;
    },
  },
  /** 鬼手陷阱 */
  "ghost_hand_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][85];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][85] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][85];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][85] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][85];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][85] = v;
    },
  },
  /** 诈骗陷阱 */
  "scam_trap": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][87];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][87] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][87];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][87] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][87];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][87] = v;
    },
  },
  /** 触手生物 */
  "tentacle_creature": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][90];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][90] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][90];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][90] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][90];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][90] = v;
    },
  },
  /** 装饰的戒指 */
  "ornamental_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][91];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][91] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][91];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][91] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][91];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][91] = v;
    },
  },
  /** 狗头人 */
  "kobold": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][100];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][100] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][100];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][100] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][100];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][100] = v;
    },
  },
  /** 哥布林 */
  "goblin": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][101];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][101] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][101];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][101] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][101];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][101] = v;
    },
  },
  /** 黏液怪 */
  "viscous_monster": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][102];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][102] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][102];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][102] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][102];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][102] = v;
    },
  },
  /** 龙头苍蝇 */
  "dragon_head_fly": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][103];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][103] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][103];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][103] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][103];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][103] = v;
    },
  },
  /** 丧尸 */
  "zombie": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][104];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][104] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][104];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][104] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][104];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][104] = v;
    },
  },
  /** 兽人 */
  "orc": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][110];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][110] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][110];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][110] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][110];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][110] = v;
    },
  },
  /** 熊地精 */
  "bugbear": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][111];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][111] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][111];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][111] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][111];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][111] = v;
    },
  },
  /** 藤蔓怪 */
  "vine_monster": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][112];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][112] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][112];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][112] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][112];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][112] = v;
    },
  },
  /** 丧尸虫 */
  "zombie_bug": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][113];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][113] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][113];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][113] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][113];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][113] = v;
    },
  },
  /** 丧尸猎犬 */
  "zombie_hound": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][114];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][114] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][114];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][114] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][114];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][114] = v;
    },
  },
  /** 蜥蜴人 */
  "lizardman": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][120];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][120] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][120];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][120] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][120];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][120] = v;
    },
  },
  /** 食人魔 */
  "ogre": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][121];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][121] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][121];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][121] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][121];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][121] = v;
    },
  },
  /** 食铠者 */
  "armor_eater": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][122];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][122] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][122];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][122] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][122];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][122] = v;
    },
  },
  /** 小仙子 */
  "pixie": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][123];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][123] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][123];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][123] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][123];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][123] = v;
    },
  },
  /** 毒蜈蚣 */
  "venomous_centipede": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][124];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][124] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][124];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][124] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][124];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][124] = v;
    },
  },
  /** 巨魔 */
  "troll": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][130];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][130] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][130];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][130] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][130];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][130] = v;
    },
  },
  /** 石像鬼 */
  "gargoyle": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][131];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][131] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][131];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][131] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][131];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][131] = v;
    },
  },
  /** 小恶魔 */
  "imp": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][132];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][132] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][132];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][132] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][132];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][132] = v;
    },
  },
  /** 男巫 */
  "warlock": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][133];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][133] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][133];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][133] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][133];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][133] = v;
    },
  },
  /** 报丧女妖 */
  "banshee": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][134];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][134] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][134];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][134] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][134];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][134] = v;
    },
  },
  /** 下等恶魔 */
  "lesser_demon": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][140];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][140] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][140];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][140] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][140];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][140] = v;
    },
  },
  /** 地狱猎犬 */
  "hellhound": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][141];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][141] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][141];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][141] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][141];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][141] = v;
    },
  },
  /** 史莱姆 */
  "slime": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][142];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][142] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][142];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][142] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][142];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][142] = v;
    },
  },
  /** 女巫 */
  "witch": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][143];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][143] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][143];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][143] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][143];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][143] = v;
    },
  },
  /** 吸血树 */
  "bloodsucking_tree": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][144];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][144] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][144];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][144] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][144];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][144] = v;
    },
  },
  /** 巨人 */
  "giant": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][150];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][150] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][150];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][150] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][150];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][150] = v;
    },
  },
  /** 奇美拉 */
  "chimera": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][151];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][151] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][151];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][151] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][151];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][151] = v;
    },
  },
  /** 魅魔 */
  "succubus": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][152];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][152] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][152];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][152] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][152];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][152] = v;
    },
  },
  /** 男祭司 */
  "male_priest": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][153];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][153] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][153];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][153] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][153];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][153] = v;
    },
  },
  /** 夜少女 */
  "night_girl": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][154];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][154] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][154];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][154] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][154];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][154] = v;
    },
  },
  /** 女忍 */
  "female_ninja": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][160];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][160] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][160];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][160] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][160];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][160] = v;
    },
  },
  /** 黑暗骑士 */
  "dark_knight": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][161];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][161] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][161];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][161] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][161];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][161] = v;
    },
  },
  /** 食脑魔 */
  "brain_eater": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][162];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][162] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][162];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][162] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][162];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][162] = v;
    },
  },
  /** 女祭司 */
  "priestess": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][163];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][163] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][163];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][163] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][163];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][163] = v;
    },
  },
  /** 小精灵 */
  "sprite": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][164];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][164] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][164];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][164] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][164];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][164] = v;
    },
  },
  /** 忍者 */
  "ninja": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][170];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][170] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][170];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][170] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][170];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][170] = v;
    },
  },
  /** 无头骑士 */
  "dullahan": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][171];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][171] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][171];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][171] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][171];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][171] = v;
    },
  },
  /** 吸血鬼 */
  "vampire": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][172];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][172] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][172];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][172] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][172];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][172] = v;
    },
  },
  /** 幽灵 */
  "ghost": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][173];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][173] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][173];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][173] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][173];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][173] = v;
    },
  },
  /** 死亡蝎 */
  "death_scorpion": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][174];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][174] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][174];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][174] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][174];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][174] = v;
    },
  },
  /** 大恶魔 */
  "arch_demon": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][180];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][180] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][180];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][180] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][180];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][180] = v;
    },
  },
  /** 死亡领主 */
  "death_lord": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][181];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][181] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][181];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][181] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][181];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][181] = v;
    },
  },
  /** 莉莉丝 */
  "lilith": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][182];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][182] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][182];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][182] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][182];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][182] = v;
    },
  },
  /** 梦魇 */
  "nightmare": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][183];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][183] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][183];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][183] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][183];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][183] = v;
    },
  },
  /** 眼魔 */
  "beholder": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][184];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][184] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][184];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][184] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][184];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][184] = v;
    },
  },
  /** 骷髅兵 */
  "skeleton": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][190];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][190] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][190];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][190] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][190];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][190] = v;
    },
  },
  /** 黑暗救世主 */
  "dark_savior": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][191];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][191] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][191];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][191] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][191];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][191] = v;
    },
  },
  /** 九尾 */
  "nine_tails": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][192];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][192] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][192];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][192] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][192];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][192] = v;
    },
  },
  /** 混沌龙 */
  "chaos_dragon": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][193];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][193] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][193];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][193] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][193];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][193] = v;
    },
  },
  /** 精英史莱姆 */
  "elite_slime": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][201];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][201] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][201];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][201] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][201];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][201] = v;
    },
  },
  /** 精英狗头人 */
  "elite_kobold": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][202];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][202] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][202];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][202] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][202];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][202] = v;
    },
  },
  /** 精英蚁怪 */
  "elite_ant": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][203];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][203] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][203];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][203] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][203];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][203] = v;
    },
  },
  /** 精英芽怪 */
  "elite_sprout": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][204];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][204] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][204];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][204] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][204];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][204] = v;
    },
  },
  /** 精英海妖 */
  "elite_siren": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][205];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][205] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][205];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][205] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][205];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][205] = v;
    },
  },
  /** 精英小仙子 */
  "elite_pixie": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][206];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][206] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][206];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][206] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][206];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][206] = v;
    },
  },
  /** 巨人酋长 */
  "giant_chief": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][207];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][207] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][207];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][207] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][207];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][207] = v;
    },
  },
  /** 精英恶魔 */
  "elite_demon": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][208];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][208] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][208];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][208] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][208];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][208] = v;
    },
  },
  /** 精英妖魔 */
  "elite_fiend": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][209];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][209] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][209];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][209] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][209];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][209] = v;
    },
  },
  /** 猎犬首领 */
  "hound_leader": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][210];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][210] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][210];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][210] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][210];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][210] = v;
    },
  },
  /** 异界勇者 */
  "otherworld_hero": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][211];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][211] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][211];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][211] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][211];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][211] = v;
    },
  },
  /** 装饰戒指 */
  "decorative_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][300];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][300] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][300];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][300] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][300];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][300] = v;
    },
  },
  /** 破坏戒指 */
  "destruction_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][301];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][301] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][301];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][301] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][301];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][301] = v;
    },
  },
  /** 守护戒指 */
  "guardian_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][302];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][302] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][302];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][302] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][302];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][302] = v;
    },
  },
  /** 加速戒指 */
  "speed_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][303];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][303] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][303];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][303] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][303];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][303] = v;
    },
  },
  /** 再生戒指 */
  "regeneration_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][304];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][304] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][304];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][304] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][304];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][304] = v;
    },
  },
  /** 意志戒指 */
  "will_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][305];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][305] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][305];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][305] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][305];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][305] = v;
    },
  },
  /** 欲望戒指 */
  "desire_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][306];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][306] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][306];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][306] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][306];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][306] = v;
    },
  },
  /** 怪力戒指 */
  "power_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][307];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][307] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][307];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][307] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][307];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][307] = v;
    },
  },
  /** 强韧戒指 */
  "toughness_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][308];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][308] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][308];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][308] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][308];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][308] = v;
    },
  },
  /** 支配戒指 */
  "domination_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][309];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][309] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][309];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][309] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][309];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][309] = v;
    },
  },
  /** 成长戒指 */
  "growth_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][310];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][310] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][310];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][310] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][310];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][310] = v;
    },
  },
  /** 虚弱戒指 */
  "weakness_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][311];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][311] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][311];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][311] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][311];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][311] = v;
    },
  },
  /** 钝重戒指 */
  "sluggish_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][312];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][312] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][312];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][312] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][312];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][312] = v;
    },
  },
  /** 死之戒指 */
  "death_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][313];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][313] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][313];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][313] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][313];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][313] = v;
    },
  },
  /** 衰弱戒指 */
  "debility_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][314];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][314] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][314];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][314] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][314];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][314] = v;
    },
  },
  /** 洗脑戒指 */
  "brainwash_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][315];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][315] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][315];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][315] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][315];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][315] = v;
    },
  },
  /** 陷阱回避戒指 */
  "trap_avoid_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][316];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][316] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][316];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][316] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][316];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][316] = v;
    },
  },
  /** 侵攻戒指 */
  "invasion_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][317];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][317] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][317];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][317] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][317];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][317] = v;
    },
  },
  /** 结界戒指 */
  "barrier_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][318];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][318] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][318];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][318] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][318];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][318] = v;
    },
  },
  /** 试炼戒指 */
  "trial_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][319];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][319] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][319];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][319] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][319];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][319] = v;
    },
  },
  /** 不幸戒指 */
  "misfortune_ring": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][320];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][320] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][320];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][320] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][320];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][320] = v;
    },
  },
  /** 剑 */
  "sword": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][340];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][340] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][340];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][340] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][340];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][340] = v;
    },
  },
  /** 法杖 */
  "staff": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][341];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][341] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][341];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][341] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][341];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][341] = v;
    },
  },
  /** 鞭子 */
  "whip": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][342];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][342] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][342];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][342] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][342];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][342] = v;
    },
  },
  /** 匕首 */
  "dagger": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][343];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][343] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][343];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][343] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][343];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][343] = v;
    },
  },
  /** 手里剑 */
  "shuriken": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][344];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][344] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][344];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][344] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][344];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][344] = v;
    },
  },
  /** 弓箭 */
  "bow": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][345];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][345] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][345];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][345] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][345];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][345] = v;
    },
  },
  /** 权杖 */
  "scepter": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][346];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][346] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][346];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][346] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][346];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][346] = v;
    },
  },
  /** 战锤 */
  "war_hammer": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][347];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][347] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][347];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][347] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][347];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][347] = v;
    },
  },
  /** 镰刀 */
  "scythe": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][348];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][348] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][348];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][348] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][348];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][348] = v;
    },
  },
  /** 触手 */
  "tentacle": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][349];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][349] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][349];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][349] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][349];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][349] = v;
    },
  },
  /** 细剑 */
  "rapier": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][350];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][350] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][350];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][350] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][350];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][350] = v;
    },
  },
  /** 偃月刀 */
  "glaive": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][351];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][351] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][351];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][351] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][351];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][351] = v;
    },
  },
  /** 指虎 */
  "knuckle": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][352];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][352] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][352];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][352] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][352];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][352] = v;
    },
  },
  /** 草药 */
  "herb": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][400];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][400] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][400];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][400] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][400];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][400] = v;
    },
  },
  /** 回复药水 */
  "healing_potion": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][401];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][401] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][401];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][401] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][401];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][401] = v;
    },
  },
  /** 回复之杖 */
  "healing_staff": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][402];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][402] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][402];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][402] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][402];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][402] = v;
    },
  },
  /** 精神之杖 */
  "spirit_staff": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][403];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][403] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][403];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][403] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][403];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][403] = v;
    },
  },
  /** 力之种子 */
  "seed_of_power": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][404];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][404] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][404];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][404] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][404];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][404] = v;
    },
  },
  /** 守之种子 */
  "seed_of_guard": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][405];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][405] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][405];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][405] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][405];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][405] = v;
    },
  },
  /** 经验硬币 */
  "exp_coin": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][406];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][406] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][406];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][406] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][406];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][406] = v;
    },
  },
  /** 命之种子 */
  "seed_of_life": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][407];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][407] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][407];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][407] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][407];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][407] = v;
    },
  },
  /** 心之种子 */
  "seed_of_heart": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][408];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][408] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][408];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][408] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][408];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][408] = v;
    },
  },
  /** 经验银币 */
  "exp_silver_coin": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][409];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][409] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][409];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][409] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][409];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][409] = v;
    },
  },
  /** 圣水 */
  "holy_water": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][410];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][410] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][410];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][410] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][410];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][410] = v;
    },
  },
  /** 堕落的宝石箱 */
  "corrupt_gem_box": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][411];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][411] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][411];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][411] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][411];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][411] = v;
    },
  },
  /** 透明化之药 */
  "invisibility_potion": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][412];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][412] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][412];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][412] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][412];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][412] = v;
    },
  },
  /** 英雄之药 */
  "hero_potion": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][413];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][413] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][413];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][413] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][413];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][413] = v;
    },
  },
  /** 商店街 */
  "shopping_street": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][500];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][500] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][500];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][500] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][500];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][500] = v;
    },
  },
  /** 沼地 */
  "swamp": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][501];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][501] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][501];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][501] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][501];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][501] = v;
    },
  },
  /** 人类牧场 */
  "human_ranch": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][502];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][502] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][502];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][502] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][502];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][502] = v;
    },
  },
  /** 冰室 */
  "ice_room": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][503];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][503] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][503];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][503] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][503];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][503] = v;
    },
  },
  /** 热砂 */
  "hot_sand": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][504];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][504] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][504];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][504] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][504];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][504] = v;
    },
  },
  /** 迷宫 */
  "labyrinth": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][505];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][505] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][505];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][505] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][505];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][505] = v;
    },
  },
  /** 博物馆 */
  "museum": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][506];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][506] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][506];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][506] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][506];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][506] = v;
    },
  },
  /** 娼馆街 */
  "brothel_street": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][507];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][507] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][507];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][507] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][507];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][507] = v;
    },
  },
  /** 野蛮人 */
  "barbarian": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][600];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][600] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][600];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][600] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][600];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][600] = v;
    },
  },
  /** 巨蚁 */
  "giant_ant": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][601];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][601] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][601];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][601] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][601];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][601] = v;
    },
  },
  /** 红皮兽人 */
  "red_skin_orc": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][602];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][602] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][602];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][602] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][602];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][602] = v;
    },
  },
  /** 食人花 */
  "man_eating_flower": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][603];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][603] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][603];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][603] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][603];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][603] = v;
    },
  },
  /** 大猩猩 */
  "gorilla": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][604];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][604] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][604];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][604] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][604];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][604] = v;
    },
  },
  /** 图腾女郎 */
  "totem_girl": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][605];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][605] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][605];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][605] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][605];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][605] = v;
    },
  },
  /** 大象 */
  "elephant": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][606];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][606] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][606];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][606] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][606];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][606] = v;
    },
  },
  /** 赤红萨满 */
  "crimson_shaman": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][607];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][607] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][607];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][607] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][607];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][607] = v;
    },
  },
  /** 巨魔法师 */
  "troll_mage": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][608];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][608] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][608];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][608] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][608];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][608] = v;
    },
  },
  /** 森林巨龙 */
  "forest_dragon": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][609];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][609] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][609];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][609] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][609];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][609] = v;
    },
  },
  /** 十字军战士 */
  "crusader_warrior": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][1005];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][1005] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][1005];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][1005] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][1005];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][1005] = v;
    },
  },
  /** 十字军神官 */
  "crusader_priest": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][1006];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][1006] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][1006];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][1006] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][1006];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][1006] = v;
    },
  },
  /** 十字军骑士 */
  "crusader_knight": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][1007];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][1007] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][1007];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][1007] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][1007];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][1007] = v;
    },
  },
  /** 十字军法师 */
  "crusader_mage": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][1008];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][1008] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][1008];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][1008] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][1008];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][1008] = v;
    },
  },
  /** 十字军猎手 */
  "crusader_hunter": {
    /**
     * 持有数
     * @returns {number}
     */
    get count() {
      return era['raw']().data['item']['hold'][1009];
    },
    /**
     * 持有数
     * @param {number} v
     */
    set count(v) {
      era['raw']().data['item']['hold'][1009] = v;
    },
    /**
     * 售价
     * @returns {number}
     */
    get price() {
      return era['raw']().data['item']['price'][1009];
    },
    /**
     * 售价
     * @param {number} v
     */
    set price(v) {
      era['raw']().data['item']['price'][1009] = v;
    },
    /**
     * 在售数
     * @returns {number}
     */
    get sales() {
      return era['raw']().data['item']['sales'][1009];
    },
    /**
     * 在售数
     * @param {number} v
     */
    set sales(v) {
      era['raw']().data['item']['sales'][1009] = v;
    },
  },
  /**
   * 之前购买的道具序号
   * @returns {number}
   */
  get bought() {
    return era['raw']().data['item']['bought'];
  },
  /**
   * 之前购买的道具序号
   * @param {number} v
   */
  set bought(v) {
    era['raw']().data['item']['bought'] = v;
  },
  /**
   * 之前购买的道具名
   * @returns {string}
   */
  get bought_name() {
    return era.get('itemname:bought');
  },
  /**
   * 在售卖中的道具对应的变量名数组
   * @returns {string[]}
   */
  get sales() {
    return era
      .get('itemkeys')
      .filter((iid) => era['raw']().data['item']['sales'][iid] > 0)
      .map((iid) => item_variable_names[iid]);
  },
  /**
   * 持有的道具对应的变量名数组
   * @type {string[]}
   */
  get hold() {
    return era
      .get('itemkeys')
      .filter((iid) => era['raw']().data['item']['hold'][iid] > 0)
      .map((iid) => item_variable_names[iid]);
  },
  clear_sales() {
    era.get('itemkeys').forEach((iid) => era['raw']().data['item']['sales'][iid] = 0);
  },
};

module.exports = era_item;
// GENERATED END