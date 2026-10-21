const era = require('#/era-electron');

/** 存档数量上限，需与游戏设置中的【存档数量】一致（10-99，默认 10）。 */
const SAVE_SLOTS = 10;

/**
 * 存档界面：每个栏位一个按钮，另有改名按钮（快捷键 = 栏位号 + 100）。
 *
 * 存档备注保存在 global 表的 `global:saves:${栏位号}` 上，
 * 因此改完备注要调用 era.saveGlobal() 把它写进 global.sav。
 */
async function page_save_game() {
  let flag = true;
  while (flag) {
    await era.clear();
    const buffer = [{ config: { content: '保存游戏' }, type: 'divider' }];
    for (let index = 1; index <= SAVE_SLOTS; index += 1) {
      const comment = era.get(`global:saves:${index}`);
      buffer.push(
        {
          accelerator: index,
          config: { width: 20 },
          content: comment || '空栏位',
          type: 'button',
        },
        {
          accelerator: index + 100,
          config: {
            align: 'right',
            disabled: comment === undefined || comment.startsWith('(FILE LOST) '),
            width: 4,
          },
          content: '改名',
          type: 'button',
        },
      );
    }
    buffer.push({ type: 'divider' }, { accelerator: 999, config: { align: 'right' }, content: '返回', type: 'button' });
    era.printMultiColumns(buffer);

    const ret = await era.input();
    if (ret === 999) {
      flag = false;
    } else if (ret > 100) {
      // 改名分支
      const savIndex = ret - 100;
      let comment;
      const current_line = era.getLineCount();
      do {
        await era.clear(era.getLineCount() - current_line);
        era.print('请输入新存档名（不超过 10 个字符）');
        comment = String(await era.input());
      } while (comment.length > 10);
      era.set(`global:saves:${savIndex}`, comment);
      await era.saveGlobal();
    } else {
      const comment = era.get(`global:saves:${ret}`);
      if (comment !== undefined && !comment.startsWith('(FILE LOST) ')) {
        era.print('该栏位已存在存档，是否覆盖？');
        era.printButton('是', 1);
        era.printButton('否', 2);
        if ((await era.input()) === 2) continue;
      }
      await era.saveData(ret, `存档 ${ret}`);
    }
  }
}

module.exports = page_save_game;
