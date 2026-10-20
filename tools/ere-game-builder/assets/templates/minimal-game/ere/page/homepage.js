const era = require('#/era-electron');

const page_load_game = require('#/page/page-load-game');
const page_save_game = require('#/page/page-save-game');

/**
 * 游戏主界面：显示当前互动角色的状态，并提供切换角色、存读档等入口。
 *
 * 子界面的通用写法：
 *   1. 进入子界面前记下 era.getLineCount()；
 *   2. 子界面返回后用 era.clear(era.getLineCount() - 记录值) 只清除它新增的行。
 */
async function homepage() {
  let flag = true;
  while (flag) {
    await era.clear();
    era.drawLine({ content: '游戏主界面' });

    const current = era.get('flag:当前角色');
    era.printMultiColumns([
      {
        config: { align: 'center', color: era.get(`cstr:${current}:代表色`), width: 6 },
        content: era.get(`callname:${current}:-2`),
        type: 'text',
      },
      {
        config: { width: 6 },
        content: `好感度：${era.get(`relation:${current}:0`)}`,
        type: 'text',
      },
      {
        config: { color: '#009300', height: 20, width: 6 },
        inContent: `体力：${era.get(`base:${current}:体力`)} / ${era.get(`maxbase:${current}:体力`)}`,
        percentage: (era.get(`base:${current}:体力`) * 100) / era.get(`maxbase:${current}:体力`),
        type: 'progress',
      },
    ]);
    era.drawLine();

    // 切换互动角色：每个已添加的角色一个按钮
    era.printMultiColumns(
      era
        .getAddedCharacters()
        .filter((id) => id > 0)
        .map((id) => ({
          accelerator: id,
          config: {
            align: 'center',
            buttonType: era.get('flag:当前角色') === id ? 'primary' : '',
            width: 6,
          },
          content: era.get(`callname:${id}:-2`),
          type: 'button',
        })),
    );

    era.printButton('和她说话', 20);
    era.printButton('休息（恢复体力）', 21);
    era.printButton('保存游戏', 30);
    era.printButton('读取存档', 31);
    era.printButton('回到标题', 99);

    const ret = await era.input();
    if (ret === 99) {
      flag = false;
    } else if (ret === 30) {
      await page_save_game();
    } else if (ret === 31) {
      if (await page_load_game()) {
        await era.clear();
        era.drawLine({ content: '读取成功' });
        await era.waitAnyKey();
      }
    } else if (ret === 20) {
      const current = era.get('flag:当前角色');
      era.set(`relation:${current}:0`, era.get(`relation:${current}:0`) + 1);
      await era.printAndWait(`你向「${era.get(`callname:${current}:-2`)}」搭话，好感度 +1。`);
    } else if (ret === 21) {
      const current = era.get('flag:当前角色');
      era.set(`base:${current}:体力`, era.get(`maxbase:${current}:体力`));
      era.set(`base:${current}:气力`, era.get(`maxbase:${current}:气力`));
      await era.printAndWait('你休息了一会儿，体力和气力都恢复了。');
    } else if (ret > 0 && ret < 20) {
      // 切换到对应角色
      era.set('flag:当前角色', ret);
    }
  }
}

module.exports = homepage;
