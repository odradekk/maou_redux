/**
 * @file 魔王（MASTER）的角色 ID。
 *
 * 本作没有换主机制，魔王恒为角色 ID 0（CONTEXT.md「魔王」）。这个常量原先在
 * 十几个文件里各写一份局部定义，`cid === MASTER` 一类的判定因此有十几个
 * 真相源；集中一处后，改动或核对只有一个位置。
 */

/** 魔王的角色 ID。 */
const MASTER = 0;

module.exports = { MASTER };
