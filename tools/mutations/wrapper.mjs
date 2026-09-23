// 变异条目表切片：ere/facade、ere/era-utils、ere/chara、ere/utils（门面与包装层）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 19; // #542 起 +3（M11310-M11312：stub-line 的 not_ported_line_wait——
// 话术退回、丢等键、丢 @函数名，均由 test/page-config.test.js 的 dispatch_config(26/28)
// 用例守护）
//；#547 起 +3（M11575-M11577，era-modsave/era-global 的两个开关循环与首臂——由 test/era-modsave.test.js 与 test/era-global.test.js 守护）

export default [
  {
    desc: 'M110 版本戳盖错值（PORT_DATA_VERSION 1 改 2）',
    file: 'ere/chara/chara-portcflag.js',
    find: 'const PORT_DATA_VERSION = 1;',
    replace: 'const PORT_DATA_VERSION = 2;',
    tests: ['event-first', 'page-title'],
    must_mention: 'portcflag',
  },
  {
    desc: 'M111 寻址族拼错（portcflag 改 portflag——族缺名字表时实机直接崩溃）',
    file: 'ere/chara/chara-portcflag.js',
    find: '  return era.set(`portcflag:${cid}:数据版本`, PORT_DATA_VERSION);',
    replace: '  return era.set(`portflag:${cid}:数据版本`, PORT_DATA_VERSION);',
    tests: ['event-first', 'page-title'],
    must_mention: 'portcflag',
  },
  {
    desc: 'M119 播种默认值改坏（音量 66 → 0，原作随包 global.sav 实证 66）',
    file: 'ere/era-utils/era-global.js',
    find: '  era_global.title_music_volume = 66;',
    replace: '  era_global.title_music_volume = 0;',
    tests: ['era-global', 'page-title'],
    must_mention: '66',
  },
  {
    desc: 'M120 播种标记守卫删掉（每次进标题都重播、覆盖用户偏好）',
    file: 'ere/era-utils/era-global.js',
    find: `  if (era_global.audio_defaults_seeded === 1) {
    return false;
  }`,
    replace: '  // 变异：无标记守卫，每次都播种',
    tests: ['era-global'],
    must_mention: '不被覆盖',
  },
  {
    desc: 'M145 分发期存根退回纯 print（stub_line_wait 丢掉等键——玩家看不到）',
    file: 'ere/utils/stub-line.js',
    find: `async function stub_line_wait(erb_name, note, owner) {
  era.print(stub_text(erb_name, note, owner));
  await era.waitAnyKey();
}`,
    replace: `async function stub_line_wait(erb_name, note, owner) {
  era.print(stub_text(erb_name, note, owner));
}`,
    tests: ['page-main-menu'],
    must_mention: '玩家先看到',
  },
  {
    desc: 'M158 未声明下标读兜底被删（undefined 泄漏给调用方）',
    file: 'ere/facade/chara-kojo.js',
    find: '    return era.get(`cflag:${this.cid}:301`) || 0;',
    replace: '    return era.get(`cflag:${this.cid}:301`);',
    tests: ['gen-facade'],
    must_mention: '读写落到正确寻址',
  },
  {
    desc: 'M159 角色视图不再按 ID 缓存（每次 chara(cid) 新对象）',
    file: 'ere/facade/chara.js',
    find: `function chara(cid) {
  const key = Number(cid);
  let view = cache.get(key);
  if (!view) {
    view = new CharaView(key);
    cache.set(key, view);
  }
  return view;
}`,
    replace: `function chara(cid) {
  return new CharaView(Number(cid));
}`,
    tests: ['gen-facade'],
    must_mention: '按 ID 缓存',
  },
  {
    desc: 'M185 产物出处路径指向不存在的文件（#71 翻过车的一类）',
    file: 'ere/facade/chara-train.js',
    find: '   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:0（UP/DOWN→delta，CONTEXT.md 变量族）',
    replace:
      '   * 源: target/ERB/SYSTEM/__NOPE__.ERB 行666 起 UP:0（UP/DOWN→delta，CONTEXT.md 变量族）',
    tests: ['gen-facade'],
    must_mention: '出处路径',
  },
  {
    desc: 'M203 一人称直设删除（CSTR:60 = 我 / CFLAG:450 = 9，SELF_CALL.ERB:38-42，#383 起真身落在 chara-self-call.js）',
    file: 'ere/chara/chara-self-call.js',
    find: `    era.set(\`cstr:\${cid}:60\`, '我');
    era.set(\`cflag:\${cid}:450\`, 9);`,
    replace: '    // 变异：一人称直设删除',
    tests: ['chara-self-call'],
    must_mention: 'CSTR:x:60 = 我',
  },
  {
    desc: 'M204 能力者技能守卫反转（!(275||…||279)，CHARA_MAKE_INIT.ERB:36）',
    file: 'ere/chara/chara-init.js',
    find: '  if (!has_element) {',
    replace: '  if (has_element) { // 变异：守卫反转',
    tests: ['chara-init'],
    must_mention: '守卫挡住五连',
  },
  {
    desc: 'M813 tequip 门面口塞位寻址错（45 写到 46——#215 四守卫位的门面靶）',
    file: 'ere/facade/chara-train.js',
    find: `  set 口塞(v) {
    era.set(\`tequip:\${this.cid}:45\`, v);
  }`,
    replace: `  set 口塞(v) {
    era.set(\`tequip:\${this.cid}:46\`, v);
  }`,
    tests: ['tequip-model'],
    must_mention: '四个口上守卫位经 train 域门面可写',
  },
  // —— #493：调教域手写区补的两条 palam 访问器（ownership 无 8/10 的测量
  // 事实，生成器发不出来，改从手写区读「当前值」一侧）——
  {
    desc: 'M10705 chara-train 手写区「耻情」寻址与「恐怖」串位（palam:8 改 10，#493）',
    file: 'ere/facade/chara-train.js',
    find: '    return era.get(`palam:${this.cid}:8`) || 0;',
    replace:
      '    return era.get(`palam:${this.cid}:10`) || 0; // 变异：与恐怖串位',
    tests: ['kojo-k14-nobleman'],
    must_mention: '首次耻情 Lv2 置 223=1',
  },
  {
    desc: 'M10706 chara-train 手写区「恐怖」寻址与「耻情」串位（palam:10 改 8，#493）',
    file: 'ere/facade/chara-train.js',
    find: '    return era.get(`palam:${this.cid}:10`) || 0;',
    replace:
      '    return era.get(`palam:${this.cid}:8`) || 0; // 变异：与耻情串位',
    tests: ['kojo-k14-nobleman'],
    must_mention: '首次恐怖 Lv2 置 224=1',
  },
  // —— #542：不移植提示行（stub-line 的第三变体）——
  {
    desc: 'M11310 not_ported_line_wait 文案退回占位话术（「不在移植范围」改回「尚未移植，此处为占位」——判死终态被读成会补的待办）',
    file: 'ere/utils/stub-line.js',
    find: '    `（${note}不在移植范围——原作 @${erb_name}，${basis}，见 docs/stub-registry.md。）`,',
    replace:
      '    `（${note}尚未移植，此处为占位——原作 @${erb_name}，${basis}，见 docs/stub-registry.md。）`, // 变异：退回占位话术',
    tests: ['page-config'],
    must_mention: '不移植提示要说清是什么与为何',
  },
  {
    desc: 'M11311 not_ported_line_wait 丢掉等键（分发期输出被重绘清掉，玩家看不到，#73 同款形态）',
    file: 'ere/utils/stub-line.js',
    find: `async function not_ported_line_wait(erb_name, note, basis) {
  era.print(
    \`（\${note}不在移植范围——原作 @\${erb_name}，\${basis}，见 docs/stub-registry.md。）\`,
  );
  await era.waitAnyKey();
}`,
    replace: `async function not_ported_line_wait(erb_name, note, basis) {
  era.print(
    \`（\${note}不在移植范围——原作 @\${erb_name}，\${basis}，见 docs/stub-registry.md。）\`,
  );
}`,
    tests: ['page-config'],
    must_mention: '提示行必须等键',
  },
  {
    desc: 'M11312 not_ported_line_wait 文案丢掉 @函数名（可检索性没了——清单、注释、提示行三处互为印证的一环断掉）',
    file: 'ere/utils/stub-line.js',
    find: '——原作 @${erb_name}，',
    replace: '——原作 ${erb_name}，',
    tests: ['page-config'],
    must_mention: '提示行必须带原作函数名 @MODLIST',
  },
  {
    desc: 'M11575 era_modsave 的卖淫影响循环错向（0 → 2，#547）',
    file: 'ere/era-utils/era-modsave.js',
    find: `  era_modsave.prostitution_effect = v === 0 ? 1 : v === 1 ? 2 : 0;`,
    replace: `  era_modsave.prostitution_effect = v === 0 ? 2 : v === 1 ? 2 : 0; // 变异：错向`,
    tests: ['era-modsave'],
    must_mention: '0→1→2→0 三档循环',
  },
  {
    desc: 'M11576 era_modsave 的反作弊翻转恒写 1（关不掉检查，#547）',
    file: 'ere/era-utils/era-modsave.js',
    find: `  era_modsave.anti_cheat = era_modsave.anti_cheat ? 0 : 1;`,
    replace: `  era_modsave.anti_cheat = 1; // 变异：恒 1`,
    tests: ['era-modsave'],
    must_mention: '0↔1 翻转',
  },
  {
    desc: 'M11577 era_global 的冒险者性别循环首臂断掉（-1 按了不动，#547）',
    file: 'ere/era-utils/era-global.js',
    find: `  const next =
    v === -1 ? 0 : v === 0 ? 1 : v === 1 ? 2 : v === 2 ? 3 : v === 3 ? 4 : -1;`,
    replace: `  const next =
    v === -1 ? -1 : v === 0 ? 1 : v === 1 ? 2 : v === 2 ? 3 : v === 3 ? 4 : -1;`,
    tests: ['era-global'],
    must_mention: '-1→0→1→2→3→4→-1 六档循环',
  },
];
