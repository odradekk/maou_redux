/**
 * 战役画面入口：@CAMPAIGN_MENU 的调用点已接通（#468），菜单主体待 #469 实现。
 *
 * 源: target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB  @CAMPAIGN_MENU（无参）
 */
const { stub_line_wait } = require('#/utils/stub-line');

const STUBBED_CALLS = ['CAMPAIGN_MENU'];

async function campaign_menu() {
  await stub_line_wait('CAMPAIGN_MENU', '战役主菜单', '#469（Q12）');
}

module.exports = { STUBBED_CALLS, campaign_menu };
