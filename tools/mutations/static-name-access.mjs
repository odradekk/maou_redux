// 名字读取前的声明检查：库存和角色状态可能含有静态表未声明的编号。
export const COUNT = 8;

export default [
  {
    desc: 'M14580 素质页跳过声明检查，直接读取未声明素质名',
    file: 'ere/chara/chara-custom2.js',
    find: "  if (!era.get('talentkeys').includes(arg)) {",
    replace: '  if (false) {',
    tests: ['chara-custom2'],
    must_mention: '三页只显示已声明素质',
  },
  {
    desc: 'M14581 武器列表跳过声明检查，读取未声明库存名',
    file: 'ere/page/page-tailor.js',
    find: "        era.get('itemkeys').includes(item_no) &&",
    replace: '        true &&',
    tests: ['page-tailor'],
    must_mention: '跳过未声明库存',
  },
  {
    desc: 'M14582 触手确认行把道具号退回按钮号 990',
    file: 'ere/page/page-tailor.js',
    find: "itemname:${item_no}`) ?? ''}了吗？",
    replace: "itemname:${result}`) ?? ''}了吗？",
    tests: ['page-tailor'],
    must_mention: '前缀档（十万位）与武器化触手',
  },
  {
    desc: 'M14583 部下总览跳过声明检查，读取未声明魔物名',
    file: 'ere/page/page-dungeon-info2.js',
    find: "    if (b > 0 && era.get('itemkeys').includes(a)) {",
    replace: '    if (b > 0) {',
    tests: ['page-dungeon-info'],
    must_mention: '部下状态总览（10）',
  },
  {
    desc: 'M14584 怪物玩弄列表跳过声明检查，读取未声明魔物名',
    file: 'ere/dungeon/monster-play.js',
    find: "    if (item_count(id) >= 1 && era.get('itemkeys').includes(id)) {",
    replace: '    if (item_count(id) >= 1) {',
    tests: ['monster-play'],
    must_mention: 'MONSTERPLAY_LIST 只列出持有',
  },
  {
    desc: 'M14585 现种族跳过声明检查，读取未声明种族名',
    file: 'ere/chara/look-info.js',
    find: "      return inrange(v, 100, 220) && era.get('itemkeys').includes(v)",
    replace: '      return inrange(v, 100, 220)',
    tests: ['look'],
    must_mention: '范围内已声明的编号显示物品名',
  },
  {
    desc: 'M14586 夹具声明序号漏掉用例显式播种的名字',
    file: 'test/helpers/era-fixture.js',
    find: '        value = [...new Set([...ids, ...seeded_ids])];',
    replace: '        value = [...ids];',
    tests: ['fixture'],
    must_mention: '名字表序号：包含 yml 声明',
  },
  {
    desc: 'M14587 夹具把库存写入误当作名字声明',
    file: 'test/helpers/era-fixture.js',
    find: '        const names = new RegExp(`^${keys_match[1]}name:',
    replace: '        const names = new RegExp(`^${keys_match[1]}(?:name)?:',
    tests: ['fixture'],
    must_mention: '名字表序号：包含 yml 声明',
  },
];
