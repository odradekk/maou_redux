/**
 * @file 调教开始前事件处理与叙述消息（EVENT_BEFORETRAIN.ERB 移植）。
 *
 * 源: target/ERB/EVENT/EVENT_BEFORETRAIN.ERB
 *     @PRITRAIN_MESSAGE（:6-201）
 *     @PRITRAIN_MESSAGE_NOCLOTHES（:207-270）
 *     @PRITRAIN_MESSAGE_CLOTHED（:266-323）
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const { clothtype_text } = require('#/page/page-clothtype');
const { wearing_cloth_all } = require('#/system/train/cloth');

/**
 * 获取角色称呼（SAVESTR / CALLNAME）
 * @param {number} cid
 * @returns {string}
 */
function chara_name(cid) {
  return chara_callname(cid);
}

/**
 * 第三人称代词（SHE(TARGET)）
 * @param {number} cid
 * @returns {string}
 */
function she(cid) {
  return era.get(`talent:${cid}:122`) ? '他' : '她';
}

/**
 * @PRITRAIN_MESSAGE_NOCLOTHES（:207-270）：初调教时・着衣设定关闭
 * @param {number} target
 */
function pritrain_message_noclothes(target) {
  const name = chara_name(target);
  const master_name = chara_name(0);

  if (era.get(`talent:${target}:22`)) {
    // 感情淡薄
    era.print(`${name}依${master_name}的命令脱掉了衣服，`);
    era.print(
      '没有展露出任何情绪，或是很好地掩饰住了情绪。然后就这样呆立不动。',
    );
  } else if (
    era.get(`talent:${target}:132`) &&
    era.get(`talent:${target}:135`)
  ) {
    // 幼稚 + 未成熟
    era.print(
      `${name}没有等${master_name}把命令说完就开始了脱衣服，一下子脱得精光。`,
    );
  } else if (era.get(`talent:${target}:12`)) {
    // 坚强
    era.print(`赤裸的${name}把双手遮在胸前，`);
    era.print('露出绝不屈服的坚决态度。');
  } else if (era.get(`talent:${target}:11`)) {
    // 反抗心
    era.print(`${master_name}伸手粗暴地将${name}剥光。`);
    era.print(`${name}一边拼命抓住衣服，一边用手遮住裸露出来的皮肤，`);
    era.print(`同时用可怕的眼神狠狠地盯着${master_name}。`);
  } else if (era.get(`talent:${target}:21`)) {
    // 自尊心高
    era.print(`听到${master_name}的命令，${name}耸了耸肩，把衣服脱了。`);
    era.print('无论怎样都无所谓，只是请稍微迅速一点。');
    era.print('就是这种态度。');
  } else if (era.get(`talent:${target}:132`)) {
    // 幼稚
    era.print(`被剥光的${name}非常地害怕。`);
    era.print('再怎么伪装也还是个孩子罢了。');
  } else if (era.get(`talent:${target}:20`)) {
    // 自制心
    era.print(`被剥光的${name}用手遮住自己的身体，`);
    era.print('表面上仍装作很平静。');
  } else if (era.get(`talent:${target}:10`)) {
    // 胆怯
    era.print(`被剥光的${name}肩膀颤抖着。`);
    era.print('想象到了自己今后的命运，不禁牙齿打颤。');
  } else if (era.get(`talent:${target}:15`)) {
    // 自尊心低 / 傲气
    era.print(`${name}想到全裸的耻辱和今后作为奴隶的屈辱，`);
    era.print('拼命地克制住自己颤抖着的牙齿和肩膀。');
  } else if (era.get(`talent:${target}:17`)) {
    // 悲观
    era.print(`被剥光的${name}提心吊胆地观察着${master_name}的表情。`);
    era.print('心里想着言听计从的话也许可以减少痛苦。');
  } else if (era.get(`talent:${target}:13`)) {
    // 坦率
    era.print(`被剥光的${name}对自己现在的处境难以接受。`);
    era.print('人不能对他人做这么过分的事，难道不是这样的吗？');
  } else if (era.get(`talent:${target}:14`)) {
    // 老实
    era.print(`意识到抵抗是无用的，${name}乖乖地把自己的衣服脱光了。`);
    era.print('至少，躲过了被强行剥光的屈辱不是吗？');
  } else if (era.get(`talent:${target}:16`)) {
    // 自大
    era.print(`${name}在害怕的同时对${master_name}投以挑衅的目光。`);
    era.print('这种事是不会让我屈服的，好像有这种自信的样子。');
  } else {
    era.print(`${name}被剥光了。`);
  }
}

/**
 * @PRITRAIN_MESSAGE_CLOTHED（:266-323）：初调教时・上衣着用时
 * @param {number} target
 */
function pritrain_message_clothed(target) {
  const name = chara_name(target);
  const master_name = chara_name(0);
  const cloth = clothtype_text(target);

  if (era.get(`talent:${target}:22`)) {
    era.print(`${cloth}的${name}毫无表情地呆立不动。`);
  } else if (
    era.get(`talent:${target}:132`) &&
    era.get(`talent:${target}:135`)
  ) {
    era.print(`${cloth}的${name}不理解要发生什么了。`);
  } else if (era.get(`talent:${target}:12`)) {
    era.print(
      `${cloth}的${name}展示出了坚决的态度。不会被抓到把柄，有这样的觉悟。`,
    );
  } else if (era.get(`talent:${target}:11`)) {
    era.print(`${cloth}的${name}用可怕的眼神狠狠地盯着${master_name}。`);
  } else if (era.get(`talent:${target}:21`)) {
    era.print(
      `${cloth}的${name}耸耸肩。无论怎样都无所谓，只是请稍微迅速一点。就是这种态度。`,
    );
  } else if (era.get(`talent:${target}:132`)) {
    era.print(`${cloth}的${name}非常地害怕。再怎么伪装也还是个孩子罢了。`);
  } else if (era.get(`talent:${target}:20`)) {
    era.print(`${cloth}的${name}表面上仍装作很平静。`);
  } else if (era.get(`talent:${target}:10`)) {
    era.print(
      `${cloth}的${name}肩膀在颤抖着。想象到了自己今后的命运，不禁牙齿打颤。`,
    );
  } else if (era.get(`talent:${target}:15`)) {
    era.print(
      `${cloth}的${name}想到今后作为奴隶的屈辱，拼命地克制住自己颤抖着的牙齿和肩膀。`,
    );
  } else if (era.get(`talent:${target}:17`)) {
    era.print(
      `${cloth}的${name}提心吊胆地观察着${master_name}的神色。心里想着言听计从的话也许可以减少痛苦。`,
    );
  } else if (era.get(`talent:${target}:13`)) {
    era.print(
      `${cloth}的${name}对自己现在的处境难以接受。人不能对他人做这么过分的事，难道不是这样的吗？`,
    );
  } else if (era.get(`talent:${target}:14`)) {
    era.print(`意识到抵抗是无用的，${cloth}的${name}老老实实的。`);
  } else if (era.get(`talent:${target}:16`)) {
    era.print(
      `${cloth}的${name}害怕的同时对${master_name}投以挑衅的目光。这种事是不会让我屈服的，好像有这种自信的样子。`,
    );
  } else {
    era.print(`${cloth}的${name}被带到调教室了。`);
  }
}

/**
 * @PRITRAIN_MESSAGE（:6-201）：调教开始时的消息。
 */
async function pritrain_message() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_name(target);
  const master_name = chara_name(0);

  // 調教経験を加算
  const { chara } = require('#/facade/chara');
  chara(target).stronghold.调教回数 += 1;
  const train_count = era.get(`cflag:${target}:10`) || 1;
  // 避免角色錯亂的暫存紀錄
  era_flag.master_backup = 0;
  era_flag.target_backup = target;
  if (assi) {
    era_flag.assi_backup = assi;
  }
  // 調教テキスト省略設定の場合 (FLAG:6 & 1)
  if ((era.get('flag:6') || 0) & 1) {
    era.print(`${target_name}的第${train_count}次调教开始了。`);
    await era.waitAnyKey();
    return 0;
  }

  era.drawLine();

  // 着衣OFFのとき全裸に
  if ((era.get('flag:37') || 0) === 0) {
    chara(target).train.着衣状态 = 0;
  }

  // 初調教時
  if (train_count === 1) {
    era.print(
      `${target_name}的第一次调教开始了，把${she(target)}变成棒棒哒性奴隶吧！`,
    );
    era.print('');

    if ((era.get('flag:37') || 0) !== 0) {
      pritrain_message_clothed(target);
    } else {
      pritrain_message_noclothes(target);
    }

    if (era.get(`talent:${target}:23`)) {
      // 容易好奇/好奇心
      era.print('');
      era.print(`然而在${target_name}的眼神最深处却好像流淌着期待的光芒。`);
    }

    if (assi > 0) {
      const assi_name = chara_name(assi);
      if (era.get(`talent:${assi}:83`)) {
        // 抖S
        era.print('');
        era.print(
          `助手${assi_name}心想着如何才能尽情享受凌辱${target_name}的乐趣。`,
        );
        era.print('那猎人看向猎物的眼神已经将她的心思完全暴露了出来。');
      } else if (era.get(`talent:${assi}:13`)) {
        // 坦率
        era.print('');
        era.print(`助手${assi_name}看到${target_name}的这个样子，`);
        era.print(
          `在得到${master_name}的许可后，轻轻把手放到了${target_name}的肩上。`,
        );
        if (era.get(`talent:${target}:11`)) {
          era.print(`而${target_name}却无情地把手甩开了。`);
        }
      }
    }

    await era.waitAnyKey();
    return 1;
  }

  // 第 N 次调教开始
  era.print(`${target_name}的第${train_count}次调教开始了。`);

  let s = 0;
  const cloth_name = clothtype_text(target);

  // 崩坏している場合
  if (era.get(`talent:${target}:9`)) {
    await era.waitAnyKey();
    era.print(`${target_name}${cloth_name}，面露痴笑，精神恍惚。`);
    era.print(`仔细观察就会发觉${target_name}的眼神已经完全失去了生气………`);
  } else if (
    (era.get(`talent:${target}:13`) ||
      era.get(`talent:${target}:14`) ||
      era.get(`talent:${target}:88`)) &&
    (era.get(`abl:${target}:10`) || 0) >= 4 &&
    (era.get(`abl:${target}:16`) || 0) >= 3 &&
    (era.get(`mark:${target}:3`) || 0) === 0
  ) {
    // 坦率/老实/奴隶 + 顺从>=4 + 侍奉精神>=3 + 无反抗刻印 → 土下座
    await era.waitAnyKey();
    era.print(
      `${target_name}${cloth_name}，土下座地跪在地上，恭敬地为${master_name}带来调教前的问候。`,
    );
    if (era.get('talent:0:83')) {
      era.print(
        `${master_name}把脚踩在${target_name}的后脑上，将其动人的脸在地板上摩擦。`,
      );
      if ((era.get(`abl:${target}:21`) || 0) >= 3) {
        era.print(`被这样卑贱地对待${target_name}的胯间似乎开始潮湿了……`);
      }
    }
    s = 1;
  } else if (
    (era.get(`talent:${target}:13`) || era.get(`talent:${target}:14`)) &&
    (era.get(`abl:${target}:10`) || 0) >= 3 &&
    (era.get(`mark:${target}:3`) || 0) <= 1
  ) {
    // 坦率/老实 + 顺从>=3 + 反抗刻印<=1 → 问候
    await era.waitAnyKey();
    era.print(
      `${target_name}${cloth_name}，悄悄地看了${master_name}一眼，然后低下了头，带来调教前的问候。`,
    );
    s = 1;
  } else {
    // 其他
    await era.waitAnyKey();
    era.print(`${cloth_name}的${target_name}被带来了。`);
    s = 1;
  }

  // ズーコ着ぐるみ (CFLAG:42 == 11 && CFLAG:40 & 64)
  const cflag40 = era.get(`cflag:${target}:40`) || 0;
  if ((era.get(`cflag:${target}:42`) || 0) === 11 && cflag40 & 64) {
    if (cflag40 === 64) {
      era.print('貌似，里面是真空的……');
    }
    await era.waitAnyKey();
    return 0;
  }

  // 妊娠中
  const day = era_flag.day_count;
  const cflag110 = era.get(`cflag:${target}:110`) || 0;
  if (era.get(`talent:${target}:153`) && cflag110 <= day + 10) {
    const prefix = s === 0 ? `${cloth_name}的` : '';
    if (era.get(`talent:${target}:100`)) {
      era.print(
        `${prefix}${target_name}\t现在正挺着与娇小的身材不相称的大肚子。`,
      );
    } else {
      era.print(`${prefix}${target_name}\t现在正挺着个大肚子。`);
    }
    era.print('（请避免过激的调教）');
  } else if (era.get(`talent:${target}:153`) && cflag110 <= day + 20) {
    era.print(
      `${target_name}腹中的胎儿已进入了稳定期，展露出孕妇特有的圆润曲线。`,
    );
  } else if (era.get(`talent:${target}:153`) && cflag110 <= day + 30) {
    era.print(`${target_name}的肚子非常引人注目。`);
  }

  // 检查衣服全穿着时的状态 B
  const old_cflag40 = era.get(`cflag:${target}:40`) || 0;
  wearing_cloth_all(target);
  const b_worn = era.get(`cflag:${target}:40`) || 0;
  chara(target).train.着衣状态 = old_cflag40;
  // 胸部真空在衣服内晃动
  if (old_cflag40 & 4) {
    if (
      (old_cflag40 & 2) === 0 &&
      b_worn & 2 &&
      !era.get(`talent:${target}:109`) &&
      !era.get(`talent:${target}:116`)
    ) {
      const breast_mod =
        era.get(`talent:${target}:110`) || era.get(`talent:${target}:114`)
          ? '明显地'
          : '稍稍地';
      era.print(
        `没有束缚的乳房在衣服内${breast_mod}摇曳着。${master_name}的眼睛正愉快地吃着雪糕。`,
      );
    }
  }

  // 乳房穿孔
  const cflag7 = era.get(`cflag:${target}:7`) || 0;
  if (cflag7 & 1 && (old_cflag40 & 2) === 0) {
    if ((old_cflag40 & 4) === 1) {
      era.print(`隔着衣服，${target_name}乳头及上面的乳环浮现了出来。`);
    } else {
      era.print(`随着${target_name}身体的运动，两个乳环也随之起舞。`);
    }
  }

  // 无内裤穿下装且露出癖<3
  if ((old_cflag40 & 1) === 0 && (old_cflag40 & 8 || old_cflag40 & 16)) {
    if (
      b_worn & 1 &&
      !era.get(`talent:${target}:135`) &&
      (era.get(`abl:${target}:17`) || 0) < 3
    ) {
      era.print(
        `${target_name}对没有穿裤子的下体非常在意，频繁地注意着自己的胯股间……`,
      );
    }
  }

  // 无内裤穿裙子且露出癖>=3
  if ((old_cflag40 & 1) === 0 && old_cflag40 & 8) {
    if (b_worn & 1 && (era.get(`abl:${target}:17`) || 0) >= 3) {
      era.print(`${target_name}卷起裙子的下摆，把没穿内裤的私处呈现了出来。`);
    }
  }

  // 下半身穿孔无内裤非裤装
  if (
    (cflag7 & 4 || cflag7 & 8) &&
    (old_cflag40 & 1) === 0 &&
    (old_cflag40 & 16) === 0
  ) {
    const loc = (old_cflag40 & 8) === 1 ? '从裙子里看到的' : '裸露着的';
    let organ = '';
    if (era.get(`talent:${target}:122`) || era.get(`talent:${target}:121`)) {
      organ = '阴茎';
    } else {
      let parts = '';
      if (cflag7 & 4) {
        parts += '两边';
      }
      if (cflag7 & 4 && cflag7 & 8) {
        parts += '和';
      }
      if (cflag7 & 8) {
        parts += '阴蒂';
      }
      organ = `阴唇${parts}`;
    }
    era.print(`${loc}${organ}穿了环，映射出金属的光芒……`);
  }

  await era.waitAnyKey();

  // 助手
  if (assi > 0) {
    const assi_name = chara_name(assi);
    const player_name = chara_name(era_flag.player);
    era.print('');
    if (era.get(`talent:${assi}:76`) && (era.get(`abl:${assi}:20`) || 0) >= 3) {
      // 淫乱 + 抖S气质>=3
      era.print(
        `${player_name}的助手${assi_name}用舌头轻舔嘴唇，津津有味地看着${target_name}，好像在考虑如何凌辱${target_name}。`,
      );
      await era.waitAnyKey();
    } else if (
      era.get(`talent:${assi}:85`) &&
      (era.get(`abl:${assi}:20`) || 0) >= 3
    ) {
      // 爱慕 + 抖S气质>=3
      era.print(
        `助手${assi_name}抱着${player_name}的手臂，微笑地看着即将被调教的${target_name}。一边在${player_name}耳边轻轻地说着什么，一边指着${target_name}呵呵地笑着。`,
      );
      await era.waitAnyKey();
    } else {
      era.print(`${player_name}的身边站着助手${assi_name}。`);
      await era.waitAnyKey();
    }
  }

  return 1;
}

module.exports = {
  pritrain_message,
  pritrain_message_clothed,
  pritrain_message_noclothes,
};
