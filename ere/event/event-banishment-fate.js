/**
 * @file 流放处刑的亲属位与前世末路计算（issue #348）。
 *
 * 源: target/ERB/處刑相關/BANISHMENT.ERB  @BANISHMENT（:269-552）
 * 源: target/ERB/處刑相關/BANISHMENT.ERB  @BANISHMENT（:612-890）
 */

'use strict';

const { get } = require('#/event/event-execution-common');

// TALENT:13/28/36/48/52/60/81/82/102/106/121/122/143/180/204 = 慈爱、
// 露出狂、迷信、眼镜、口交狂、自慰狂、喜欢女人、讨厌男人、阴蒂肥大、
// 肛门狂、扶她、男人、孩子气、卖淫、肉便器；315/320 = 前生活/家族构成。
// ABL:3/11/13/17/21/22 = 肛门感觉、欲望、侍奉技术、露出癖、抖M、百合；
// EXP:56/70/74 = 兽奸、拍摄、卖淫经验。
function has(cid, family, index) {
  return get(`${family}:${cid}:${index}`) !== 0;
}

function family_bits(cid) {
  const relatives = get(`talent:${cid}:320`);
  return {
    sister: Math.floor((relatives % 1000000) / 100000),
    brother: Math.floor((relatives % 10000000) / 1000000),
    younger_sister: Math.floor((relatives % 100000000) / 10000000),
    younger_brother: Math.floor((relatives % 1000000000) / 100000000),
  };
}

function former_life_fate(cid) {
  const man = has(cid, 'talent', 122);
  switch (get(`talent:${cid}:315`)) {
    case 0:
      return '下落不明';
    case 1:
      return `${has(cid, 'talent', 204) ? '淫荡' : ''}${has(cid, 'talent', 48) ? (man ? '眼镜仔' : '眼镜娘') : ''}${has(cid, 'talent', 180) ? '卖淫' : ''}学生`;
    case 2:
      return `${get(`abl:${cid}:13`) > 0 || has(cid, 'talent', 52) ? '沦为口交母猪的' : ''}${get(`abl:${cid}:3`) > 0 || has(cid, 'talent', 106) ? '尻穴买春的' : ''}${man ? '修士' : '修女'}`;
    case 3:
      return `${has(cid, 'talent', 13) ? '种田的' : ''}${get(`exp:${cid}:56`) >= 5 ? '兽奸的' : ''}${man ? '农民' : '农妇'}`;
    case 4:
      return `${has(cid, 'talent', 13) ? '工作上手的' : ''}${get(`exp:${cid}:74`) >= 5 ? '卖淫的' : ''}渔民`;
    case 5:
      return `${get(`abl:${cid}:21`) > 0 ? '手交猪猡' : ''}${get(`abl:${cid}:17`) > 0 || has(cid, 'talent', 28) ? '露出狂' : ''}娼妓`;
    case 6:
      return `${get(`abl:${cid}:22`) > 0 || has(cid, 'talent', 81) || has(cid, 'talent', 82) ? '诱拐人口的' : ''}盗贼`;
    case 7:
      return `${has(cid, 'talent', 180) ? '低贱的' : ''}乞丐娼妓`;
    case 8:
      return `贵族的${get(`abl:${cid}:11`) > 0 || has(cid, 'talent', 102) || has(cid, 'talent', 60) ? '手淫中毒的' : ''}${man ? '大少爷' : '千金小姐'}`;
    case 9:
      return `${get(`exp:${cid}:70`) >= 5 ? (man ? '前男优' : '前女优') : ''}贫民`;
    case 10:
      return `${get(`abl:${cid}:17`) > 0 || has(cid, 'talent', 28) ? '露出狂' : ''}守墓人`;
    case 11:
      return `${get(`abl:${cid}:3`) > 0 || has(cid, 'talent', 106) ? '肛交卖淫的' : ''}${man ? '巫者' : '巫女'}`;
    case 12:
      return `${get(`abl:${cid}:13`) > 0 || has(cid, 'talent', 52) ? '沦为口交母猪的' : ''}${man ? '圣者' : '圣女'}`;
    case 13:
      return `${get(`abl:${cid}:13`) > 0 || has(cid, 'talent', 52) ? '沦为口交母猪的' : ''}预言者`;
    case 14:
      return `${get(`abl:${cid}:11`) > 0 || has(cid, 'talent', 36) ? '性骚扰' : ''}占卜师`;
    case 15:
      return `${has(cid, 'talent', 204) ? '沦为肉便器的' : ''}看板娘`;
    case 16:
      return `${get(`abl:${cid}:17`) > 0 || has(cid, 'talent', 28) ? '裸体' : ''}${man ? '村民' : '村娘'}`;
    case 17:
      return `${get(`abl:${cid}:17`) > 0 || has(cid, 'talent', 28) ? '神秘的' : ''}隐居者`;
    case 18:
      return `面包店的${has(cid, 'talent', 204) ? '沦为肉便器的' : ''}看板娘`;
    case 19:
      return `${get(`exp:${cid}:70`) >= 5 ? '耻辱的' : ''}${man ? '将校' : '女将校'}`;
    case 20:
      return `${has(cid, 'talent', 143) || has(cid, 'talent', 13) ? '少年专用的' : ''}奴隶`;
    case 21:
      return `${get(`exp:${cid}:56`) >= 5 ? '爱好兽奸的' : ''}${man ? '主夫' : '主妇'}`;
    default:
      return '下落不明';
  }
}

module.exports = { family_bits, former_life_fate };
