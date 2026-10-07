// #749：三个创建入口不得重建已在场的同号角色。
export const COUNT = 5;

export default [
  {
    desc: 'M14800 生命摇篮追加预设不检查同号角色已在场',
    file: 'ere/chara/chara-custom.js',
    find: '  if (find_chara(arg) >= 0) {',
    replace: '  if (false) {',
    tests: ['duplicate-character-creation-engine'],
    must_mention: '拒绝后保留已有角色的全部数据',
    engine: true,
  },
  {
    desc: 'M14801 捕获勇者候选不排除已在场预设',
    file: 'ere/event/enter-enemy.js',
    find: '.filter((cid) => cid >= 1 && cid <= 16 && !added.includes(cid));',
    replace: '.filter((cid) => cid >= 1 && cid <= 16);',
    tests: ['duplicate-character-creation-engine'],
    must_mention: '捕获不重建既有角色',
    engine: true,
  },
  {
    desc: 'M14802 捕获没有可用普通预设时仍继续创建',
    file: 'ere/event/enter-enemy.js',
    find: '    if (chara_id === 0) {',
    replace: '    if (false) {',
    tests: ['duplicate-character-creation-engine'],
    must_mention: '普通预设全部在场时捕获明确返回失败且不改变角色',
    engine: true,
  },
  {
    desc: 'M14803 影仆召唤不检查同号角色已在场',
    file: 'ere/page/page-shop-labo.js',
    find: '    if (era.getAddedCharacters().includes(local)) {',
    replace: '    if (false) {',
    tests: ['duplicate-character-creation-engine'],
    must_mention: '影仆召唤不重建既有角色',
    engine: true,
  },
  {
    desc: 'M14804 生命摇篮追加被拒绝后仍进入定制',
    file: 'ere/chara/chara-custom.js',
    find: '      if (target < 0) {\n        return 0;\n      }',
    replace: '',
    tests: ['duplicate-character-creation-engine'],
    must_mention: '普通生命摇篮拒绝已在场勇者和精英，返回后全部数据不变',
    engine: true,
  },
];
