const era = require('#/era-electron');

/** 存档数量上限，需与游戏设置中的【存档数量】一致（10-99，默认 10）。 */
const SAVE_SLOTS = 10;

/**
 * 读档界面：点击栏位读档，快捷键 +100 删除该栏位的存档。
 *
 * @returns {Promise<boolean>} 是否成功读取了一个存档。
 */
async function page_load_game() {
  let flag = true;
  while (flag) {
    await era.clear();
    const buffer = [{ config: { content: '读取游戏' }, type: 'divider' }];
    for (let index = 1; index <= SAVE_SLOTS; index += 1) {
      const comment = era.get(`global:saves:${index}`);
      const empty = comment === undefined || comment.startsWith('(FILE LOST) ');
      buffer.push(
        {
          accelerator: index,
          config: { disabled: empty, width: 20 },
          content: comment || '空栏位',
          type: 'button',
        },
        {
          accelerator: index + 100,
          config: { align: 'right', disabled: empty, width: 4 },
          content: '删除',
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
      const savIndex = ret - 100;
      era.print(`是否删除栏位 ${savIndex} 的存档？`);
      era.printButton('是', 1);
      era.printButton('否', 2);
      if ((await era.input()) === 1) {
        await era.rmData(savIndex);
      }
    } else if (await era.loadData(ret)) {
      // 读档成功后，所有存档数据已被替换；若有需要跨存档重建的运行时状态（例如事件队列），
      // 应在这里重新初始化。
      return true;
    }
  }
  return false;
}

module.exports = page_load_game;
