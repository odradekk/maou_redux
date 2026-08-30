// 跨域写现有条目表（issue #72 冻结）。
//
// 这不是「可以裸寻址」的许可，而是「尚未迁移」的待办表：每一条都是 ere/
// 里已经写着的裸跨域写（属主域 ≠ 所在文件域，未走 #71 门面的具名方法），
// 等所属子系统的票来消化。消化方式：把调用改成门面访问器（game.<域>.<字段>
// / chara(cid).<域>.<字段>；目标尚无访问器时先在 tools/facade-names.js
// 补名并 node tools/gen-facade.js --force），然后删/减本表条目。
//
// 两条硬规则（都在 tools/domain-check.mjs 里强制执行，退出码生效）：
//   1. 只能变短：每条必须落在 #72 冻结基线（LEDGER_BASELINE，内嵌于
//      domain-check.mjs）内、计数不得超过，超基线即红——新跨域写必须走
//      门面，不许进这里；扩基线必须显式改那份冻结表。
//   2. 不许过期失效：条目在代码里已不存在（访问被删或改写）也红——同步删/减。
// test/domain-check.test.js 是这两条与完整性检查的行为靶（含变异自证），
// 不持基线副本——数据只有条目表与冻结基线两份。
//
// 键 = js 文件（相对仓库根），值 = { 寻址串: 次数 }。寻址串归一为
// `表:下标`（cid 段丢弃——属主与角色无关）；次数吸收同串重复。

export const DOMAIN_LEDGER = {
  'ere/event/event-com.js': {
    'tflag:100': 1,
  },
  'ere/event/event-comend.js': {
    'tflag:34': 2,
  },
  'ere/event/event-end.js': {
    'base:1': 2,
    'cflag:81': 2,
    'cflag:82': 2,
    'flag:7': 2,
    'tflag:860': 2,
  },
  'ere/event/event-first.js': {
    'cflag:1': 1,
    'cflag:11': 1,
    'cflag:12': 1,
    'cflag:13': 1,
    'cflag:14': 1,
    'cflag:16': 1,
    'cflag:420': 1,
    'cflag:450': 1,
    'cflag:451': 1,
    'cflag:9': 1,
    'flag:35': 1,
    'flag:37': 1,
    'flag:5': 1,
    'flag:500': 1,
  },
  'ere/event/event-train.js': {
    'base:2': 3,
    'base:3': 1,
    'base:4': 1,
    'palam:3': 1,
    'palam:5': 1,
    'tflag:402': 1,
  },
  'ere/event/first-setting.js': {
    'flag:501': 1,
  },
  'ere/page/page-select-target.js': {
    'flag:1': 1,
    'flag:2': 1,
  },
  'ere/page/page-shop.js': {
    'flag:36': 4,
  },
  'ere/page/page-train.js': {
    'tflag:999': 1,
  },
};
