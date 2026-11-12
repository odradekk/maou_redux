/**
 * @file 口上「编号 → 钩子」的测试入口（#859）。
 *
 * 生产侧的分发族（22 个 DispatchFamily）已删除：分发 = 按性格编号从工厂取
 * 实例、调同名钩子。用例里「按编号直调某一档口上」的写法仍然有意义——它
 * 绕开素质播种，直接钉某套口上的某一档（K902 那种游戏里没有的编号也只能
 * 这样测），所以这里提供与已删除的 DispatchFamily **同形**的对象：
 * `call(id, { args, whenMissing })`、`has(id)`、`register(id, fn)`、`declared`。
 *
 * `call` 落到工厂实例的同名钩子上；未注册的编号与生产侧一致（基类实例，
 * 钩子不输出），`whenMissing` 语义也照旧。`register` 只写在本对象的覆盖表里，
 * 给用例注入探针用，不进生产注册表。
 *
 * 新用例优先调入口函数（`kojo_message_com` 之类，含总开关与编号窗口），
 * 本文件只服务「按编号直调」这类断言。
 */

/** 声明编号空间：普通口上 0-39 + EX 口上 901-1600（与 kojo-system 的窗口同源） */
const DECLARED_IDS = Object.freeze([
  ...Array.from({ length: 40 }, (_, i) => i),
  ...Array.from({ length: 700 }, (_, i) => i + 901),
]);

/**
 * 造一个「编号 → 钩子」对象。
 * @param {string} hook 钩子名（KojoBase 的方法名）
 * @returns {object} 与已删除的分发族同形的对象
 */
function make_family(hook) {
  /** 用例注入的探针（不进生产注册表） */
  const overrides = new Map();
  return {
    declared: DECLARED_IDS,
    /**
     * 该编号在这个「族」里有没有实现。
     * @param {number} id 口上编号（= LOCAL - 100）
     * @returns {boolean} true = 有（工厂注册过，或用例注入过探针）
     */
    has(id) {
      return (
        overrides.has(id) ||
        require('#/kojo/kojo-factory').registered_kojo_ids().includes(id)
      );
    },
    /**
     * 注册探针（用例专用；后注册的覆盖先注册的，与工厂的「重复即炸」不同）。
     * @param {number} id 口上编号
     * @param {Function} fn 处理器
     */
    register(id, fn) {
      overrides.set(id, fn);
    },
    /**
     * 调该编号的钩子。
     * @param {number} id 口上编号
     * @param {object} [options] 实参与缺席语义
     * @param {any[]} [options.args=[]] 钩子实参
     * @param {any} [options.whenMissing] 未注册时的返回值
     * @returns {Promise<any>} 钩子返回值
     */
    async call(id, options = {}) {
      const { args = [], whenMissing } = options;
      if (overrides.has(id)) {
        return overrides.get(id)(...args);
      }
      const factory = require('#/kojo/kojo-factory');
      if (!factory.registered_kojo_ids().includes(id)) {
        return whenMissing;
      }
      return factory.get_kojo(id)[hook](...args);
    },
  };
}

/** 22 个钩子各一份（名字沿用删除前的族名，调用点不用改） */
module.exports = {
  kojo_message_com_family: make_family('kojo_message_com'),
  kojo_message_palamcng_family: make_family('kojo_message_palamcng'),
  kojo_message_markcng_family: make_family('kojo_message_markcng'),
  self_kojo_family: make_family('self_kojo'),
  dog_kojo_family: make_family('dog_kojo'),
  colosseum_kojo_family: make_family('colosseum_kojo'),
  benki_koujo_family: make_family('benki_koujo'),
  dungeon_victory_family: make_family('dungeon_victory'),
  dungeon_attack_family: make_family('dungeon_attack'),
  ryouzyoku_kojo_family: make_family('dungeon_ryouzyoku'),
  ryouzyoku_after_kojo_family: make_family('dungeon_ryouzyoku_after'),
  ntr_koujo_family: make_family('ntr_koujo'),
  exucution_koujo_family: make_family('exucution_koujo'),
  museum_koujo_family: make_family('museum_koujo'),
  banishment_koujo_family: make_family('banishment_koujo'),
  public_exucution_koujo_family: make_family('public_exucution_koujo'),
  grotesque_koujo_family: make_family('grotesque_koujo'),
  enterenemy_koujo_family: make_family('enterenemy_koujo'),
  gohoubi_request_koujo_family: make_family('gohoubi_request_koujo'),
  gohoubi_after_koujo_family: make_family('gohoubi_after_koujo'),
  osioski_koujo_family: make_family('osioski_koujo'),
  gobi_koujo_family: make_family('gobi_koujo'),
  /** 钩子名表（契约测试用） */
  HOOKS: [
    'kojo_message_com',
    'kojo_message_palamcng',
    'kojo_message_markcng',
    'self_kojo',
    'dog_kojo',
    'colosseum_kojo',
    'benki_koujo',
    'dungeon_victory',
    'dungeon_attack',
    'dungeon_ryouzyoku',
    'dungeon_ryouzyoku_after',
    'ntr_koujo',
    'exucution_koujo',
    'museum_koujo',
    'banishment_koujo',
    'public_exucution_koujo',
    'grotesque_koujo',
    'enterenemy_koujo',
    'gohoubi_request_koujo',
    'gohoubi_after_koujo',
    'osioski_koujo',
    'gobi_koujo',
  ],
};
