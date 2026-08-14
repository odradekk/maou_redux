---
title: '#B 通用工具类'
---

# 颜色工具

```javascript
// color-utils.js
module.exports = {
  /**
   * 用于计算两个颜色之间的渐变色
   *
   * @param {string} _start 起始颜色，十六进制格式的颜色值 (#aabbcc)，默认值为#ffffff (white)
   * @param {string} _end 结束颜色，十六进制格式的颜色值 (#aabbcc)，默认值为#ffffff (white)
   * @param {number} ratio 起始颜色和结束颜色之间的比例，0-1之间的小数
   * @returns {string} 渐变颜色，十六进制格式的颜色值 (#aabbcc)
   */
  get_gradient_color(_start, _end, ratio) {
    const start = _start || '#ffffff';
    const end = _end || '#ffffff';
    if (ratio <= 0) {
      return start;
    }
    if (ratio >= 1) {
      return end;
    }
    // 将起始颜色和结束颜色转换为RGB数组
    const start_arr = [
        start.substring(1, 3),
        start.substring(3, 5),
        start.substring(5, 7),
      ].map((v) => Number(`0x${v}`)),
      end_arr = [
        end.substring(1, 3),
        end.substring(3, 5),
        end.substring(5, 7),
      ].map((v) => Number(`0x${v}`));
    // 计算渐变颜色的RGB值
    return `rgb(${start_arr
      .map((v, i) => v + Math.floor((end_arr[i] - v) * ratio))
      .join(',')})`;
  },
};
```

# 数组工具

```javascript
// list-utils.js
const { get_random_value } = require('#/utils/value-utils');

/**
 * 从数组中随机选择一个元素
 *
 * @template T
 * @param {T[]} list 输入的数组
 * @returns {T} 随机选择的元素，如果数组为空则返回 undefined
 */
function get_random_entry(list) {
  if (!list.length) {
    return undefined;
  }
  if (list.length === 1) {
    return list[0];
  }
  return list[Math.floor(list.length * Math.random())];
}

/**
 * 根据指定的排序函数对数组进行排序
 *
 * @template T
 * @param {T[]} list 输入的数组
 * @param {function(T,number):number} order_by 排序函数，接受元素和索引作为参数，返回排序值
 * @param {boolean} [is_asc] 是否升序排序，默认为 true
 * @returns {T[]} 排序后的数组
 */
function sort_list(list, order_by, is_asc) {
  if (typeof order_by !== 'function') {
    return list;
  }
  return list
    .map((v, i) => {
      return {
        val: v,
        orderBy: order_by(v, i),
      };
    })
    .sort((a, b) => (is_asc ? a.orderBy - b.orderBy : b.orderBy - a.orderBy))
    .map((v) => v.val);
}

module.exports = {
  /**
   * 根据指定的键函数对数组进行去重
   *
   * @template T
   * @param {T[]} list 输入的数组
   * @param {function(T):string} key_cb 键函数，接受元素作为参数，返回键值
   * @returns {T[]} 去重后的数组
   */
  distinct_list(list, key_cb) {
    /** @type {Record<string,{entry:*,index:number}>} */
    const dict = {};
    list.forEach((e, i) => (dict[key_cb(e)] = { entry: e, index: i }));
    return Object.values(dict)
      .sort((a, b) => a.index - b.index)
      .map((e) => e.entry);
  },
  /**
   * 从数组中随机选择指定数量的元素
   *
   * @template T
   * @param {T[]} list 输入的数组
   * @param {number} max 要选择的元素数量
   * @returns {T[]} 随机选择的元素数组
   */
  gacha(list, max) {
    if (max <= 0) {
      return [];
    }
    if (list.length <= max) {
      return list;
    }
    if (max === 1) {
      return [get_random_entry(list)];
    }
    const ret = [];
    for (let i = 0; i < list.length; ++i) {
      if (i < max) {
        ret.push(i);
      } else {
        const rand = get_random_value(0, i);
        if (rand < max) {
          ret[rand] = i;
        }
      }
    }
    return sort_list(ret, (x) => x, true).map((i) => list[i]);
  },
  /**
   * 获取数组中的极值元素
   *
   * @template T
   * @param {T[]} list 输入的数组
   * @param {(T)=>number} order_by 排序函数，接受元素作为参数，返回排序值
   * @returns {{max:T,min:T}} 包含最大值和最小值的对象
   */
  get_extremum_entry(list, order_by) {
    if (list.length <= 1) {
      return list[0];
    }
    const _list = list.map((v) => {
      return {
        val: v,
        orderBy: order_by(v),
      };
    });
    let max_entry = _list[0],
      min_entry = _list[0],
      max_val = max_entry.orderBy,
      min_val = min_entry.orderBy;
    _list.forEach((e) => {
      if (e.orderBy > max_val) {
        max_entry = e;
        max_val = max_entry.orderBy;
      } else if (e.orderBy < min_val) {
        min_entry = e;
        min_val = min_entry.orderBy;
      }
    });
    return { max: max_entry.val, min: min_entry.val };
  },
  get_random_entry,
  /**
   * 将数组中的元素连接成一个字符串
   *
   * @param {*[]} list 输入的数组
   * @param {string} separator 分隔符
   * @returns {string} 连接后的字符串
   */
  join_list(list, separator) {
    return list.filter((e) => e).join(separator);
  },
  /**
   * 计算数组的中位数
   *
   * @param {number[]} list 输入的数组
   * @returns {number} 中位数
   */
  median(list) {
    if (list.length === 0) {
      return undefined;
    }
    const sorted = sort_list(list, (e) => e);
    if (sorted.length % 2) {
      return sorted[Math.floor(sorted.length / 2)];
    } else {
      return (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
    }
  },
  sort_list,
};
```

# 数值工具

```javascript
// value-utils.js
module.exports = {
  /**
   * 生成指定范围内的随机数
   *
   * @param {number} min - 随机数的最小值。
   * @param {number} max - 随机数的最大值。
   * @param {boolean} [is_float] - 是否生成浮点数，默认为 false。
   * @returns {number} - 生成的随机数。
   */
  get_random_value(min, max, is_float) {
    if (min >= max) {
      return min;
    }
    const dice = Math.random();
    if (is_float) {
      return min + (max - min) * dice;
    }
    return Math.floor(min + (max - min + 1) * dice);
  },
};
```