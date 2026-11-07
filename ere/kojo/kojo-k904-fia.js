/**
 * @file 菲娅口上 K904（issue #250，J40；#858 改为继承 K19）。
 *
 * K19 与 K904 是同一套台词的两个入口：K19 由性格素质 TALENT:179 触发（口上号
 * 19），K904 由迁移后的 EX_TALENT:104 触发（EX 口上号 904 → LOCAL 1004）。迁移前
 * 本文件是 kojo-k19-fia.js 的整份复制品（9,385 行），把编号归一之后只剩 38 行
 * 不同，其中 3 行还是注释——其余全是「同一段逻辑换了地址」。
 *
 * 现在只剩下面三处差异，其余台词、状态机与七道头部检查一律继承 KojoK19：
 *
 *   - `is_own_kojo`：本口上认 EX_TALENT:104，K19 认 TALENT:179；
 *   - `mark_present`：存在标志写 EX_FLAG:104（K19 写 FLAG:119）；
 *   - `gobi_koujo`：语尾取常量表的 904 号行（K19 取 19 号行）。
 *
 * museum_koujo 不按博物馆口上编号分派：固定输出求慰台词（爱慕时）与低头正文
 * ——正文在父类的 museum_koujo_k19，本文件不再各写一份。单人结局口上未实现。
 */

'use strict';

const era = require('#/era-electron');
const era_exflag = require('#/era-utils/era-exflag');
const { KojoK19 } = require('#/kojo/kojo-k19-fia');
const { get_kojo, register_kojo } = require('#/kojo/kojo-factory');
const { gobi_text } = require('#/data/gobi-koujo-const');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
  benki_koujo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  ntr_koujo_family,
  exucution_koujo_family,
  museum_koujo_family,
  banishment_koujo_family,
  public_exucution_koujo_family,
  grotesque_koujo_family,
  enterenemy_koujo_family,
  gobi_koujo_family,
} = require('#/kojo/kojo-system');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');

/**
 * 菲娅 EX 口上 K904：只覆盖与 KojoK19 不同的三处。
 *
 * 类里没有别的东西——多加一个覆盖方法就是「K904 特有的分支」漂回去的开始，
 * 两套口上的正文必须逐字相同（迁移前它们本就是同一份复制品）。
 */
class KojoK904 extends KojoK19 {
  /**
   * 目标角色身上挂着本口上的素质吗（EX_TALENT:104）。
   * @param {number} target 目标角色号
   * @returns {boolean} true = 这套口上归目标角色
   */
  is_own_kojo(target) {
    return (era.get(`ex_talent:${target}:104`) || 0) == 1;
  }

  /**
   * 本口上的存在标志（EVENTTRAIN 置 1、EVENTEND 清 0）。EX 口上的标志是
   * EX_FLAG:(LOCAL - 900)，与 K19 的 FLAG:119 是两个变量，互不覆盖。
   * @param {number} value 1 = 存在，0 = 清
   */
  mark_present(value) {
    era_exflag.set(104, value);
  }

  /** 语尾取自常量表的 904 号行（K19 用 19 号行；两行文字当前逐字相同） */
  async gobi_koujo(arg0, rand) {
    return gobi_text(904, arg0, rand);
  }
}

// 口上族接入：与 K19 同款，只是号不同——一律转发到 904 的工厂实例，
// 台词本体全部继承自 KojoK19。迁移完成后随族一起删。
register_kojo(904, KojoK904);
const kojo_k904 = get_kojo(904);
ryouzyoku_kojo_family.register(904, (...args) =>
  kojo_k904.dungeon_ryouzyoku(...args),
);
ryouzyoku_after_kojo_family.register(904, (...args) =>
  kojo_k904.dungeon_ryouzyoku_after(...args),
);
benki_koujo_family.register(904, (...args) => kojo_k904.benki_koujo(...args));
dungeon_victory_family.register(904, (...args) =>
  kojo_k904.dungeon_victory(...args),
);
dungeon_attack_family.register(904, (...args) =>
  kojo_k904.dungeon_attack(...args),
);
ntr_koujo_family.register(904, (...args) => kojo_k904.ntr_koujo(...args));
exucution_koujo_family.register(904, (...args) =>
  kojo_k904.exucution_koujo(...args),
);
museum_koujo_family.register(904, (...args) => kojo_k904.museum_koujo(...args));
banishment_koujo_family.register(904, (...args) =>
  kojo_k904.banishment_koujo(...args),
);
public_exucution_koujo_family.register(904, (...args) =>
  kojo_k904.public_exucution_koujo(...args),
);
grotesque_koujo_family.register(904, (...args) =>
  kojo_k904.grotesque_koujo(...args),
);
enterenemy_koujo_family.register(904, (...args) =>
  kojo_k904.enterenemy_koujo(...args),
);
gohoubi_request_koujo_family.register(904, (...args) =>
  kojo_k904.gohoubi_request_koujo(...args),
);
gohoubi_after_koujo_family.register(904, (...args) =>
  kojo_k904.gohoubi_after_koujo(...args),
);
osioski_koujo_family.register(904, (...args) =>
  kojo_k904.osioski_koujo(...args),
);
gobi_koujo_family.register(904, (...args) => kojo_k904.gobi_koujo(...args));
kojo_message_com_family.register(904, (...args) =>
  kojo_k904.kojo_message_com(...args),
);
kojo_message_palamcng_family.register(904, (...args) =>
  kojo_k904.kojo_message_palamcng(...args),
);
kojo_message_markcng_family.register(904, (...args) =>
  kojo_k904.kojo_message_markcng(...args),
);
self_kojo_family.register(904, (...args) => kojo_k904.self_kojo(...args));

/**
 * 本模块的事件处理器：由 system/flow/startup.js 的装配表按顺序调用 register()
 * 注册（模块装载本身不注册，装配顺序见该文件）。四处接线与 K19 同一份，
 * 处理器只多传一个 K904 实例去取三个差异点。
 */
function register() {
  kojo_k904.register_events();
}

module.exports = { register, KojoK904 };
