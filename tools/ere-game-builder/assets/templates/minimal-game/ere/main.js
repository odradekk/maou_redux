const era = require('#/era-electron');

const homepage = require('#/page/homepage');
const page_load_game = require('#/page/page-load-game');

/**
 * 游戏入口。引擎加载完脚本集后会把 SDK 的 API 注入 era-electron.js，
 * 然后调用这里导出的异步函数；游戏逻辑从标题界面开始。
 *
 * 注意：#/ 是引擎提供（并由 webpack.config.js / jsconfig.json 对齐）的
 * 路径别名，指向游戏文件夹下的 ere/ 目录。
 */
module.exports = async () => {
  let running = true;
  while (running) {
    await era.clear();
    era.setAlign('center');
    era.drawLine({ isSolid: true });
    era.print('{{TITLE}}');
    // gamebase 是只读对象，属性名是 GameBase.csv 里的英文变量名
    era.print(`v${era.get('gamebase').version / 1000}`);
    era.drawLine({ isSolid: true });
    era.printButton('开始游戏', 1);
    era.printButton('读取存档', 2);
    era.printButton('离开游戏', 3);
    era.drawLine({ isSolid: true });
    era.setAlign('left');

    switch (await era.input()) {
      case 1:
        // 新游戏：先清空当前存档数据，再按 Chara*.csv 的预设初始化角色
        era.resetData();
        [0, 1].forEach((id) => era.addCharacter(id));
        era.set('flag:金钱', 1000);
        era.set('flag:当前角色', 1);
        await homepage();
        break;
      case 2:
        if (await page_load_game()) {
          await homepage();
        }
        break;
      case 3:
        running = false;
        break;
    }
  }
  era.quit();
};
