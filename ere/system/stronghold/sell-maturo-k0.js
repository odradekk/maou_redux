/**
 * @file 成熟奴隶出售后的黑市末路（issue #338）。
 *
 * 源: target/ERB/售卻相關/SELL_MATURO.ERB @SELL_MATURO_K0（:29-2099）
 *
 * 原作 S = SALE_CHARA 算出的售价；独立调用时用 ESTIMATE_CHARA 重算。
 * 市场菜单的 1000 号输入翻转 EXFLAG:9000 第 2 位（水晶球录像开关）。
 * 原作 135 处无参 SHE() 会读取 0 号角色而非出售对象；按 #14 登记的缺陷
 * 1:1 保留为 she(0)，不顺手修正玩家可见代词。
 *
 * 变量语义：MARK 下标 3 = 反抗刻印；CFLAG 下标 9 = 等级、605 = 压缩
 * 家族关系；ABL 下标 2/3/15 = 私处/肛门感觉/话术；TALENT 下标 75-77/
 * 85 = 性爱狂/淫乱/尻穴狂/爱慕，110/114/119 = 巨乳/爆乳/超乳，122 =
 * 男人，200-207 = 八类职业，204 = 肉便器，314 = 种族；CSTR 下标 5 =
 * 家人的末路记录；TSTR 下标 30 = VIDEO_MATURO 消费的录像标题暂存。
 */

'use strict';

const era = require('#/era-electron');
const { peek_sale_price } = require('#/event/event-aftertrain');
const { search_family } = require('#/chara/chara-family');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

function she(id) {
  return (era.get(`talent:${id}:122`) || 0) !== 0 ? '他' : '她';
}

function print_market_menu() {
  era.print('要卖到哪个市场？');
  era.printButton('魔界的黑市', 0);
  era.printButton('魔界的异族交易市场', 1);
  era.printButton('魔界的宠物市场', 2);
  era.printButton('找什么市场？随手卖掉吧！！', 999);
  era.printButton('水晶球记录', 1000, {
    color: era_exflag.mod_switch_bits & 4 ? '#ffffff' : '#646464',
  });
}

async function choose_market(cid, price, rand) {
  let redraw = true;
  for (;;) {
    if (redraw) print_market_menu();
    redraw = false;
    const result = await era.input();
    if (result < 0 || (result >= 3 && result !== 999 && result !== 1000)) {
      continue;
    }
    if (result === 999) return true;
    if (result === 1000) {
      era_exflag.mod_switch_bits ^= 4;
      redraw = true;
      continue;
    }
    if (result === 1) {
      const { sell_maturo_k1 } = require('#/system/stronghold/sell-maturo');
      await sell_maturo_k1(cid, { price, rand });
      return true;
    }
    if (result === 2) {
      const { sell_maturo_k2 } = require('#/system/stronghold/sell-maturo');
      await sell_maturo_k2(cid, { price });
      return true;
    }
    return false;
  }
}

/** @SELL_MATURO_K0：市场选择与黑市末路。 */
async function sell_maturo_k0(cid = era_flag.target, { price, rand } = {}) {
  const { estimate_chara } = require('#/system/stronghold/sale');
  const { video_maturo } = require('#/system/stronghold/sell-video');
  price ??= peek_sale_price() || estimate_chara(cid).price;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target_name = chara_callname(cid);
  const master_name = chara_name(0);
  let buyer = '';
  let route = 0;
  let ending = '';

  if (await choose_market(cid, price, rand_n)) return 0;

  if (era.get(`mark:${cid}:3`) == 3) {
    // 源行 84

    if (era.get(`talent:${cid}:314`) == 9) {
      // 源行 86

      if (price >= 100000) {
        // 源行 88
        if (rand_n(2) == 0) {
          // 源行 89
          buyer = '魔界中央奴隶市场'; // 源行 90
          route = 1; // 源行 91
        } else {
          // 源行 92
          buyer = '魔界中央奴隶市场'; // 源行 93
          route = 0; // 源行 94
        } // 源行 95
        await era.printAndWait(`${target_name}被送到${buyer}………`); // 源行 96
        await era.printAndWait(`………`); // 源行 97
        await era.printAndWait(`……`); // 源行 98
        await era.printAndWait(`…`); // 源行 99

        if (route == 1) {
          // 源行 101

          if (era.get(`cflag:${cid}:9`) >= 50) {
            // 源行 103
            await era.printAndWait(
              `${target_name}作为死斗场的角斗士在战斗着。`,
            ); // 源行 104
            await era.printAndWait(
              `貌似经历了许多相当严苛的死斗，依然活下来了。`,
            ); // 源行 105
            await era.printAndWait(
              `如果让主办者不尽兴的话，也许很快就会不明不白地死掉吧。`,
            ); // 源行 106
            ending = '角斗士'; // 源行 107
          } else {
            // 源行 108
            await era.printAndWait(
              `${target_name}在奴隶船上叫醒了其它奴隶，发动了叛乱。`,
            ); // 源行 109
            await era.printAndWait(
              `但是起义却被其它的奴隶背叛，被轻易地镇压了。`,
            ); // 源行 110
            await era.printAndWait(`作为惩罚，貌似被丢海里喂鱼了……`); // 源行 111
            ending = '鲨鱼的食物'; // 源行 112
          } // 源行 113
        } else if (route == 0) {
          // 源行 115

          if (
            era.get(`talent:${cid}:202`) == 1 ||
            era.get(`talent:${cid}:206`) == 1
          ) {
            // 源行 117
            await era.printAndWait(`被选为新落成的神殿的祭品。`); // 源行 118
            await era.printAndWait(
              `${target_name}被带来了。听说${target_name}以前是高明的圣职者，神官们都因此非常满意。`,
            ); // 源行 119
            await era.printAndWait(
              `拿${target_name}做祭品的神殿，一定是了不起的神殿吧……`,
            ); // 源行 120
            ending = '神殿的人柱'; // 源行 121
          } else {
            // 源行 122
            await era.printAndWait(
              `作为原勇者的${target_name}，现在双手双脚都被锁链锁着，在港口做苦力。`,
            ); // 源行 123
            await era.printAndWait(
              `时而展现出的反抗态度，告诉了人们背上伤痕累累的原因。`,
            ); // 源行 124
            await era.printAndWait(
              `这种悲惨而痛苦的生活，应该一生都无法摆脱了……`,
            ); // 源行 125
            ending = '苦力奴隶'; // 源行 126
          } // 源行 127
        } // 源行 128
      } else {
        // 源行 130
        if (rand_n(2) == 0) {
          // 源行 131
          buyer = '魔界地方奴隶市场'; // 源行 132
          route = 1; // 源行 133
        } else {
          // 源行 134
          buyer = '魔界地方奴隶市场'; // 源行 135
          route = 0; // 源行 136
        } // 源行 137
        await era.printAndWait(`${target_name}被送到${buyer}………`); // 源行 138
        await era.printAndWait(`………`); // 源行 139
        await era.printAndWait(`……`); // 源行 140
        await era.printAndWait(`…`); // 源行 141
        if (route == 1) {
          // 源行 142
          if (rand_n(2) == 0) {
            // 源行 143
            await era.printAndWait(
              `${target_name}在奴隶小屋准备转运奴隶的时候试图逃走。`,
            ); // 源行 144
            await era.printAndWait(
              `当然，最后还是被抓回来了，${target_name}要因此被重罚。`,
            ); // 源行 145
            await era.printAndWait(`双眼都被小刀挖掉了。`); // 源行 146
            era.setColor('#990000'); // 源行 147
            await era.printAndWait(
              `「那位客人……来看看这个吧？双目失明不可能逃走哦！」`,
            ); // 源行 148
            era.setColor(); // 源行 149
            ending = '瞎子奴隶'; // 源行 150
          } else {
            // 源行 151
            era.setColor('#990000'); // 源行 152
            await era.printAndWait(
              `「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦！」`,
            ); // 源行 153
            era.setColor(); // 源行 154
            await era.printAndWait(
              `${target_name}在奴隶小屋准备转运奴隶的时候试图逃走。`,
            ); // 源行 155
            await era.printAndWait(
              `当然，最后还是被抓回来了，${target_name}要因此接受惩罚。`,
            ); // 源行 156
            await era.printAndWait(
              `右脚的脚跟被挑断了，其它奴隶看得心惊胆颤。`,
            ); // 源行 157
            era.setColor('#990000'); // 源行 158
            await era.printAndWait(`「这样，以后都别想逃跑了…」`); // 源行 159
            era.setColor(); // 源行 160
            ending = '瘸子奴隶'; // 源行 161
          } // 源行 162
        } else if (route == 0) {
          // 源行 163

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 165
            await era.printAndWait(
              `尚拥有反抗心的${target_name}在市场上引起暴动，把前来视察的地方领主的脸刮伤了。`,
            ); // 源行 166
            await era.printAndWait(
              `本来只需要普通的鞭刑。但是，那位大人有另外的打算。`,
            ); // 源行 167
            await era.printAndWait(
              `以恶毒性虐者而闻名的地方领主，将${she(0)}买下带到肉联厂去了。`,
            ); // 源行 168
            await era.printAndWait(''); // 源行 169
            await era.printAndWait(`「你看，上等的肉哦？！看看这胸～」`); // 源行 170
            await era.printAndWait(
              `就这样，${target_name}的肉以一斤500点的价格在市面上出售了。`,
            ); // 源行 171
            ending = '肉品'; // 源行 172
          } else {
            // 源行 173
            era.setColor('#990000'); // 源行 174
            await era.printAndWait(
              `「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦！」`,
            ); // 源行 175
            era.setColor(); // 源行 176
            await era.printAndWait(
              `逃走失败的${target_name}被绑在手术台上，看来马上要进行什么变态的改造。`,
            ); // 源行 177
            await era.printAndWait(
              `数小时后，${she(0)}的手脚都被截肢，弄成人棍了。`,
            ); // 源行 178
            await era.printAndWait(
              `猎奇收藏家觉得不错，马上把${she(0)}买走了……`,
            ); // 源行 179
            ending = '生物标本'; // 源行 180
          } // 源行 181
        } // 源行 182
      } // 源行 183
    } else {
      // 源行 185

      if (price >= 100000) {
        // 源行 187

        if (era.get(`talent:${cid}:314`) == 5) {
          // 源行 189
          buyer = '魔界中央奴隶市场'; // 源行 190
          route = 2; // 源行 191
        } else if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 193
          buyer = '魔界中央奴隶市场'; // 源行 194
          route = 1; // 源行 195
        } else {
          // 源行 196
          buyer = '魔界中央奴隶市场'; // 源行 197
          route = 0; // 源行 198
        } // 源行 199
        await era.printAndWait(`${target_name}被送到${buyer}………`); // 源行 200
        await era.printAndWait(`………`); // 源行 201
        await era.printAndWait(`……`); // 源行 202
        await era.printAndWait(`…`); // 源行 203

        if (route == 2) {
          // 源行 205
          era.setColor('#990000'); // 源行 206
          await era.printAndWait(
            `「客人客人！过来看过来挑啊！这里可是有好东西哦！？」`,
          ); // 源行 207
          era.setColor(); // 源行 208
          await era.printAndWait(
            `被叫住的客人是和贩子相熟的商人，被引入帐篷里了。`,
          ); // 源行 209
          await era.printAndWait(
            `一进去，就看到了张牙舞爪，振翅挺胸随时可以高飞似得龙族女孩。`,
          ); // 源行 210
          await era.printAndWait(
            `不过${target_name}的眼神里，却没有生命的灵光，因为已经是个标本了。`,
          ); // 源行 211
          era.setColor('#990000'); // 源行 212
          await era.printAndWait(
            `「我和你熟才告诉你啊～这孩子咬舌自尽了！就这么讨厌当奴隶么……」`,
          ); // 源行 213
          era.setColor(); // 源行 214
          ending = '标本'; // 源行 215
        } else if (route == 1) {
          // 源行 216

          await era.printAndWait(`${target_name}作为死斗场的角斗士在战斗着。`); // 源行 218

          if (era.get(`cflag:${cid}:9`) >= 100) {
            // 源行 220
            await era.printAndWait(
              `和其它角斗士一起发动了叛乱，最后被镇压了。`,
            ); // 源行 221
            await era.printAndWait(
              `作为主谋的${target_name}一直行踪不明，无法处置。`,
            ); // 源行 222
            await era.printAndWait(
              `而其它在叛乱中被生擒的角斗士，全部拿去喂猛兽了。`,
            ); // 源行 223
          } else {
            // 源行 224
            await era.printAndWait(
              `和其它角斗士一起发动了叛乱，最后被镇压了。`,
            ); // 源行 225
            await era.printAndWait(`作为主谋的${target_name}要因此接受惩罚。`); // 源行 226
            await era.printAndWait(`成为了死斗场中冠军猛兽的食物。`); // 源行 227
          } // 源行 228
          ending = '角斗士'; // 源行 229
        } else if (route == 0) {
          // 源行 230

          if (
            era.get(`talent:${cid}:202`) == 1 ||
            era.get(`talent:${cid}:206`) == 1
          ) {
            // 源行 232
            await era.printAndWait(`被选为新落成的神殿的祭品。`); // 源行 233
            await era.printAndWait(
              `${target_name}被带来了。听说${target_name}以前是高明的圣职者，神官们都非常满意。`,
            ); // 源行 234
            await era.printAndWait(
              `拿${target_name}做祭品的神殿，一定是了不起的神殿了吧……`,
            ); // 源行 235
            ending = '神殿的人柱'; // 源行 236
          } else {
            // 源行 237
            await era.printAndWait(`作为船底仓的划桨奴隶，被锁在桨上。`); // 源行 238
            await era.printAndWait(`一天，船遇到了风浪，沉没了。`); // 源行 239
            await era.printAndWait(
              `在那之后，就再也没有听到${target_name}的消息。`,
            ); // 源行 240
            ending = '划桨奴隶'; // 源行 241
          } // 源行 242
        } // 源行 243
      } else {
        // 源行 245
        if (rand_n(2) == 0) {
          // 源行 246
          buyer = '魔界地方奴隶市场'; // 源行 247
          route = 1; // 源行 248
        } else {
          // 源行 249
          buyer = '魔界地方奴隶市场'; // 源行 250
          route = 0; // 源行 251
        } // 源行 252
        await era.printAndWait(`${target_name}被送到${buyer}………`); // 源行 253
        await era.printAndWait(`………`); // 源行 254
        await era.printAndWait(`……`); // 源行 255
        await era.printAndWait(`…`); // 源行 256
        if (route == 1) {
          // 源行 257
          if (rand_n(2) == 0) {
            // 源行 258
            era.setColor('#990000'); // 源行 259
            await era.printAndWait(`「哈哈～像你这种沉默不语的最可爱了！」`); // 源行 260
            era.setColor(); // 源行 261
            await era.printAndWait(
              `即将对${target_name}进行手术的男人笑着说。`,
            ); // 源行 262
            await era.printAndWait(
              `${she(0)}的手肘及膝盖以下都被切除，换成金属的替代品。`,
            ); // 源行 263
            await era.printAndWait(
              `完全没有听到任何的抗议，因为舌头已经被拔掉了。`,
            ); // 源行 264
            era.setColor('#990000'); // 源行 265
            await era.printAndWait(`「呃呃，这张桌子，应该能卖个好价钱………」`); // 源行 266
            era.setColor(); // 源行 267
            ending = '活着的桌子'; // 源行 268
          } else {
            // 源行 269
            era.setColor('#990000'); // 源行 270
            await era.printAndWait(`「哈哈～像你这种沉默不语的最可爱了！」`); // 源行 271
            era.setColor(); // 源行 272
            await era.printAndWait(
              `即将为${target_name}进行手术的男人笑着说。`,
            ); // 源行 273
            await era.printAndWait(
              `${she(0)}的四肢被齐根切除，以人棍的模样被做成了人肉椅子。`,
            ); // 源行 274
            await era.printAndWait(
              `舌头也被拔掉了，手脚则作为椅子的装饰被粘合在椅子上。`,
            ); // 源行 275
            era.setColor('#990000'); // 源行 276
            await era.printAndWait(`「呃呃，这张椅子，应该能卖个好价钱………」`); // 源行 277
            era.setColor(); // 源行 278
            ending = '活着的椅子'; // 源行 279
          } // 源行 280
        } else if (route == 0) {
          // 源行 281

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 283
            await era.printAndWait(
              `尚拥有反抗心的${target_name}在市场上引起暴动，把前来视察的地方领主的脸刮伤了。`,
            ); // 源行 284
            await era.printAndWait(
              `本来只需要普通的鞭刑，但是，那位大人有另外的打算。`,
            ); // 源行 285
            await era.printAndWait(
              `以恶毒性虐者而闻名的地方领主，将${she(0)}买下带到肉联厂去了。`,
            ); // 源行 286
            await era.printAndWait(''); // 源行 287
            await era.printAndWait(`「你看，上等的肉哦？！看看这胸～」`); // 源行 288
            await era.printAndWait(
              `就这样${target_name}的肉以一斤500点的价格在市面上出售了。`,
            ); // 源行 289
            ending = '肉品'; // 源行 290
          } else {
            // 源行 291
            era.setColor('#990000'); // 源行 292
            await era.printAndWait(
              `「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦」`,
            ); // 源行 293
            era.setColor(); // 源行 294
            await era.printAndWait(
              `逃走失败的${target_name}被绑在手术台上，看来马上要进行什么变态的改造。`,
            ); // 源行 295
            await era.printAndWait(
              `数小时后，${she(0)}的手脚都被截肢，弄成人棍了。`,
            ); // 源行 296
            await era.printAndWait(
              `猎奇收藏家觉得不错，马上把${she(0)}买走了……`,
            ); // 源行 297
            ending = '生物标本'; // 源行 298
          } // 源行 299
        } // 源行 300
      } // 源行 301
    } // 源行 302
  } else if (era.get(`talent:${cid}:85`)) {
    // 源行 304

    if (era.get(`talent:${cid}:314`) == 9) {
      // 源行 306

      if (price >= 1000000) {
        // 源行 308

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 310
          buyer = '魔王军将军'; // 源行 311
          route = 3; // 源行 312
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 314
          buyer = '魔界贵族'; // 源行 315
          route = 2; // 源行 316
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 318
          buyer = '堕落神的神官长'; // 源行 319
          route = 1; // 源行 320
        } else {
          // 源行 322
          buyer = '魔界土豪'; // 源行 323
          route = 0; // 源行 324
        } // 源行 325
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 326
        await era.printAndWait(`………`); // 源行 327
        await era.printAndWait(`……`); // 源行 328
        await era.printAndWait(`…`); // 源行 329

        if (route == 3) {
          // 源行 331

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 333
            await era.printAndWait(
              `${target_name}的蜜壶，不管被怎么粗暴对待都只会产生快感。私处紧紧地按摩着将军的阴茎，让他也快感连连。`,
            ); // 源行 334
            await era.printAndWait(
              `迷人的肉体以及作为原勇者的经历，也是将军非常中意的地方。`,
            ); // 源行 335
            await era.printAndWait(
              `原来只是打算买个性奴隶，现在渐渐变得像是爱人了。`,
            ); // 源行 336
          } else {
            // 源行 337
            await era.printAndWait(`将军对${target_name}的肉穴相当粗暴。`); // 源行 338
            await era.printAndWait(
              `作为性奴隶，每晚都被狠狠侵犯，像是要玩坏一般。`,
            ); // 源行 339
            await era.printAndWait(
              `只靠作为原勇者的耐久力，恐怕被玩坏也只是时间问题了吧。`,
            ); // 源行 340
          } // 源行 341
          ending = '性奴隶'; // 源行 342
        } else if (route == 2) {
          // 源行 344

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 346
            await era.printAndWait(
              `被主人买下的${target_name}每天晚上都被仔细地玩弄乳房，在床上不断娇喘着。`,
            ); // 源行 347
            await era.printAndWait(
              `不过，${she(0)}在你身边的时候已经充分学会如何应对这种情况了。`,
            ); // 源行 348
            await era.printAndWait(
              `作为被主人宠爱的宠物，${target_name}的生活还是过得比较幸福的。`,
            ); // 源行 349
          } else {
            // 源行 350
            await era.printAndWait(
              `${target_name}在屋里做着女仆和情人的工作。`,
            ); // 源行 351
            await era.printAndWait(
              `每天都过着只要主人高兴就会被叫到房里做爱的生活。`,
            ); // 源行 352
            await era.printAndWait(
              `恐怕没几天就会被主人干到怀孕，不过应该也会被勒令堕胎吧。`,
            ); // 源行 353
          } // 源行 354
          ending = '魔界贵族的情人'; // 源行 355
        } else if (route == 1) {
          // 源行 357

          if (era.get(`talent:${cid}:77`) == 1) {
            // 源行 359
            await era.printAndWait(
              `${target_name}作为堕落神和神官长的近侍在神殿里工作着。`,
            ); // 源行 360
            await era.printAndWait(
              `为了更好地供奉堕落神，神官长对${she(0)}的肛门进行了深度的调教。`,
            ); // 源行 361
            await era.printAndWait(
              `现在，敏感的菊穴已经被扩张，巨魔的阴茎也能轻易插入了。`,
            ); // 源行 362
            ending = '菊奴女神官'; // 源行 363
          } else {
            // 源行 364
            await era.printAndWait(
              `${target_name}作为神官长的第五个情妇每晚都被侵犯。`,
            ); // 源行 365
            await era.printAndWait(
              `曾经也是神职人员的${target_name}，现在歌颂堕落神。`,
            ); // 源行 366
            await era.printAndWait(`因为堕落神赐予的愉悦，而不断娇喘着。`); // 源行 367
            ending = '性奴女神官'; // 源行 368
          } // 源行 369
        } else if (route == 0) {
          // 源行 371

          if (era.get(`abl:${cid}:15`) >= 5) {
            // 源行 373
            await era.printAndWait(
              `${target_name}在枕边经常妙语连珠，让土豪决定把${she(0)}当成秘书。`,
            ); // 源行 374
            await era.printAndWait(
              `机智的交涉及性感的身体，为主人带来了不少好处。`,
            ); // 源行 375
            await era.printAndWait(
              `每晚，从客厅里都不断传出被主人和客人疼爱的呻吟。`,
            ); // 源行 376
            ending = '生意助手'; // 源行 377
          } else {
            // 源行 378
            await era.printAndWait(
              `${target_name}作为土豪的第八个情妇被买下了，总是如影随形地跟着。`,
            ); // 源行 379
            await era.printAndWait(
              `过于温柔的性格不为魔族所喜，不过土豪的众多孩子却相当喜欢。`,
            ); // 源行 380
            await era.printAndWait(
              `被土豪已经成年的儿子求爱了，在房间里每晚都被疼爱着。`,
            ); // 源行 381
            ending = '土豪的情人'; // 源行 382
          } // 源行 383
        } // 源行 384
      } else if (price >= 500000) {
        // 源行 386

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 388
          buyer = '黑帮首领'; // 源行 389
          route = 3; // 源行 390
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 392
          buyer = '魔界地方领主'; // 源行 393
          route = 2; // 源行 394
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 396
          buyer = '堕落神的神殿'; // 源行 397
          route = 1; // 源行 398
        } else {
          // 源行 400
          buyer = '魔界的大商人'; // 源行 401
          route = 0; // 源行 402
        } // 源行 403
        await era.printAndWait(`${buyer}买下${target_name}之后`); // 源行 404
        await era.printAndWait(`………`); // 源行 405
        await era.printAndWait(`……`); // 源行 406
        await era.printAndWait(`…`); // 源行 407

        if (route == 3) {
          // 源行 409

          if (era.get(`talent:${cid}:203`) == 1) {
            // 源行 411
            await era.printAndWait(
              `在魔界也是首屈一指的繁荣城市里，${target_name}成为了黑社会的一员。`,
            ); // 源行 412
            await era.printAndWait(
              `因为原来的盗贼经历，马上融入到了黑社会的生活之中了。`,
            ); // 源行 413
            await era.printAndWait(`作为首领的爱人，也习惯了被每天疼爱着。`); // 源行 414
            ending = '黑老大的情人'; // 源行 415
          } else {
            // 源行 416
            await era.printAndWait(
              `在魔界也是首屈一指的繁荣城市里，${target_name}成为了黑社会的一员。`,
            ); // 源行 417
            await era.printAndWait(
              `原来作为战士的本领得以发挥，过着保镖一样的生活。`,
            ); // 源行 418
            await era.printAndWait(`作为首领的爱人，也习惯了被每天疼爱着。`); // 源行 419
            ending = '黑老大的情人'; // 源行 420
          } // 源行 421
        } else if (route == 2) {
          // 源行 423

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 425
            await era.printAndWait(
              `${target_name}在女仆长的指示下在屋子里帮忙收拾。`,
            ); // 源行 426
            await era.printAndWait(
              `因为低胸的女仆装，总是被男人们用下流的眼光看着，有时还被揩油。`,
            ); // 源行 427
            await era.printAndWait(
              `到了晚上，就彻底地被领主所占有了，过着这样的生活。`,
            ); // 源行 428
            ending = '领主的女仆'; // 源行 429
          } else {
            // 源行 430
            await era.printAndWait(
              `${target_name}因为年轻，被作为年幼的领主的玩具一样被放置在他的身边。`,
            ); // 源行 431
            await era.printAndWait(`每天过着像布娃娃一样的生活。`); // 源行 432
            await era.printAndWait(
              `在主人玩够之前，这种生活还要不停地持续着。`,
            ); // 源行 433
            ending = '领主的玩物'; // 源行 434
          } // 源行 435
        } else if (route == 1) {
          // 源行 437

          if (era.get(`talent:${cid}:77`) == 1) {
            // 源行 439
            await era.printAndWait(
              `神殿新设置了堕落神的贡品，${target_name}作为奴隶要为神殿献出身心。`,
            ); // 源行 440
            await era.printAndWait(
              `被络绎不绝的信徒们侵犯肛门多次，${target_name}淫媚的呻吟越来越大声了。`,
            ); // 源行 441
            await era.printAndWait(
              `好像这样子就能让堕落神高兴似得，不断奉献着。`,
            ); // 源行 442
            ending = '邪神殿的菊奴'; // 源行 443
          } else {
            // 源行 444
            await era.printAndWait(
              `神殿新设置了堕落神的贡品，所有信徒都可以无偿侵犯。`,
            ); // 源行 445
            await era.printAndWait(
              `然后，被信徒侵犯所生下的孩子，也在神殿中被抚养着。`,
            ); // 源行 446
            await era.printAndWait(
              `原来信仰其它神的${target_name}，现在全心全意地信奉着堕落神了。`,
            ); // 源行 447
            ending = '邪神殿的性奴'; // 源行 448
          } // 源行 449
        } else if (route == 0) {
          // 源行 451

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 453
            await era.printAndWait(
              `${target_name}作为员工们的肉便器被放置在公司。`,
            ); // 源行 454
            await era.printAndWait(`十几年间，生下了许多不知父亲是谁的孩子。`); // 源行 455
            await era.printAndWait(
              `生下的孩子也马上作为肉便器被卖掉了，那些钱拿来做了${target_name}的生活费。`,
            ); // 源行 456
            ending = '肉便器'; // 源行 457
          } else {
            // 源行 458
            await era.printAndWait(
              `作为情妇被买下的${target_name}老老实实地侍奉着自己的主人。`,
            ); // 源行 459
            await era.printAndWait(
              `每晚都和商人的正室一起侍奉着商人，应该说是作为商人夫妇的共同宠物被宠爱着。`,
            ); // 源行 460
            await era.printAndWait(`据说在怀孕之后，孩子也作为宠物被抚养了。`); // 源行 461
            ending = '商人的情人'; // 源行 462
          } // 源行 463
        } // 源行 464
      } else if (price >= 100000) {
        // 源行 466

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 468
          buyer = '魔王军的士官'; // 源行 469
          route = 3; // 源行 470
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:201`) == 1
        ) {
          // 源行 472
          buyer = '魔界学院'; // 源行 473
          route = 2; // 源行 474
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 476
          buyer = '魔界大农场'; // 源行 477
          route = 1; // 源行 478
        } else {
          // 源行 480
          buyer = '魔界商人'; // 源行 481
          route = 0; // 源行 482
        } // 源行 483
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 484
        await era.printAndWait(`………`); // 源行 485
        await era.printAndWait(`……`); // 源行 486
        await era.printAndWait(`…`); // 源行 487

        if (route == 3) {
          // 源行 489

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 491
            await era.printAndWait(
              `士官在战场上立功了，用奖金买下了${target_name}。`,
            ); // 源行 492
            await era.printAndWait(
              `被年轻士官推倒的时候，${target_name}终于有被卖了的自觉。`,
            ); // 源行 493
            await era.printAndWait(
              `士官沉迷于${target_name}舒服的私处感触里了。`,
            ); // 源行 494
          } else {
            // 源行 495
            await era.printAndWait(
              `士官在战场上立功了，用奖金买下了${target_name}。`,
            ); // 源行 496
            await era.printAndWait(
              `被年轻士官推倒的时候，${target_name}终于有被卖了的自觉。`,
            ); // 源行 497
            await era.printAndWait(
              `在因被侵犯而泪流满面的奴隶身上，年轻的士官终于成为了大人了。`,
            ); // 源行 498
          } // 源行 499
          ending = '士官的性奴'; // 源行 500
        } else if (route == 2) {
          // 源行 502

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 504
            await era.printAndWait(
              `${target_name}那双有魅力的乳房，被注射了学院还在开发中的药剂。`,
            ); // 源行 505
            await era.printAndWait(
              `乳房变为以前的两倍大，还不停地分泌着母乳，作为食堂的人形取奶器而受到欢迎。`,
            ); // 源行 506
            await era.printAndWait(
              `巨大的胸部让学生们爱不释手，${target_name}每天都因此被玩得死去活来。`,
            ); // 源行 507
            ending = '人形奶牛'; // 源行 508
          } else {
            // 源行 509
            await era.printAndWait(
              `作为学生的性处理便器而购买的${target_name}，作用还不止于此，`,
            ); // 源行 510
            await era.printAndWait(
              `经常作为交配用的实验动物，被实验室所征用。`,
            ); // 源行 511
            await era.printAndWait(
              `如果能产生什么新物种的话，整个实验小组会被你传召嘉奖也说不定。`,
            ); // 源行 512
            ending = '异种交配实验体'; // 源行 513
          } // 源行 514
        } else if (route == 1) {
          // 源行 516

          if (era.get(`talent:${cid}:77`) == 1) {
            // 源行 518
            await era.printAndWait(
              `大农场主在买农奴的时候顺便买下了${target_name}。`,
            ); // 源行 519
            await era.printAndWait(
              `最初品尝过${she(0)}的肛门之后，被预想以外的快感所震惊，因而每晚都要侵犯${she(0)}。`,
            ); // 源行 520
            await era.printAndWait(
              `被巨大阴茎连续侵犯的结果，就是${she(0)}现在只能摊在床上，还略带有脱肛。`,
            ); // 源行 521
          } else {
            // 源行 522
            await era.printAndWait(
              `大农场主在买农奴的时候顺便买下了${target_name}。`,
            ); // 源行 523
            await era.printAndWait(
              `也说不出到底喜欢${she(0)}哪里，但是依然像对妻子一样温柔地对待${she(0)}。`,
            ); // 源行 524
            await era.printAndWait(
              `接受了主人精液的${target_name}怀孕了，临盘也快了。`,
            ); // 源行 525
          } // 源行 526
          ending = '大农场主的性奴隶'; // 源行 527
        } else if (route == 0) {
          // 源行 529

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 531
            await era.printAndWait(`作为店里的肉便器被放在厕所里。`); // 源行 532
            await era.printAndWait(
              `无论客人还是店员都可以使用的肉便器，${target_name}的身上还标明了哪些时段是客人专用。`,
            ); // 源行 533
            await era.printAndWait(
              `终于怀孕了的时候还被挂上了【肉便器出产秀】的牌子，看来到极限为止都会被锁在厕所里。`,
            ); // 源行 534
            ending = '肉便器'; // 源行 535
          } else {
            // 源行 536
            await era.printAndWait(`${target_name}作为素材被妖术师买下了。`); // 源行 537
            await era.printAndWait(
              `按照顾客的需求进行了改造，给${target_name}赋予了一些附加价值。`,
            ); // 源行 538
            await era.printAndWait(`好像又转卖给其它人了。`); // 源行 539
            ending = '魔改肉块'; // 源行 540
          } // 源行 541
        } // 源行 542
      } else {
        // 源行 544

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 546
          buyer = '魔界的矿山主'; // 源行 547
          route = 3; // 源行 548
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 550
          buyer = '魔界的酒吧'; // 源行 551
          route = 2; // 源行 552
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 554
          buyer = '魔界的农场'; // 源行 555
          route = 1; // 源行 556
        } else {
          // 源行 558
          buyer = '街角的公厕'; // 源行 559
          route = 0; // 源行 560
        } // 源行 561
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 562
        await era.printAndWait(`………`); // 源行 563
        await era.printAndWait(`……`); // 源行 564
        await era.printAndWait(`…`); // 源行 565

        if (route == 3) {
          // 源行 567

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 569
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            ); // 源行 570
            await era.printAndWait(
              `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
            ); // 源行 571
          } else {
            // 源行 572
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            ); // 源行 573
            await era.printAndWait(`好几次都因被侵犯而嚎啕大哭。`); // 源行 574
          } // 源行 575
          ending = '矿山性奴'; // 源行 576
        } else if (route == 2) {
          // 源行 578

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 580
            await era.printAndWait(
              `对${target_name}宏伟的胸部来说，女服务员的制服胸口处实在是太小了。`,
            ); // 源行 581
            await era.printAndWait(
              `「适合你的制服呢～」店长这么说着，最后的结果是要${she(0)}一直赤裸上身迎客。`,
            ); // 源行 582
            await era.printAndWait(
              `每晚都收到很多小费，再这么下去，看来帮自己赎身也只是时间问题而已。`,
            ); // 源行 583
            ending = '酒馆女侍应'; // 源行 584
          } else {
            // 源行 585
            await era.printAndWait(
              `在店主和客人之间周旋，${target_name}像个娼妇一样地活着。`,
            ); // 源行 586
            await era.printAndWait(`原勇者，现在也彻底堕落了。`); // 源行 587
            ending = '酒馆女侍应'; // 源行 588
          } // 源行 589
        } else if (route == 1) {
          // 源行 591

          if (era.get(`talent:${cid}:77`) == 1) {
            // 源行 593
            await era.printAndWait(
              `${target_name}和其它几个奴隶作为农奴被买下了。`,
            ); // 源行 594
            await era.printAndWait(
              `不过，农场主在试过${she(0)}舒服的肛门之后上瘾了。`,
            ); // 源行 595
            await era.printAndWait(`现在作为专用性奴隶而存在着。`); // 源行 596
            ending = '农场主的性奴'; // 源行 597
          } else {
            // 源行 598
            await era.printAndWait(
              `${target_name}和其它几个奴隶作为农奴被买下了。`,
            ); // 源行 599
            await era.printAndWait(
              `为了不让其它农奴逃跑，强制让${she(0)}做了农奴们的共同妻子，每晚都被好几个男人侵犯着。`,
            ); // 源行 600
            ending = '农奴的共妻'; // 源行 601
          } // 源行 602
        } else if (route == 0) {
          // 源行 604

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 606
            await era.printAndWait(`作为现役肉便器继续侍奉着。`); // 源行 607
            await era.printAndWait(
              `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
            ); // 源行 608
            await era.printAndWait(
              `在被精液淹死之前，好像生下了不下一百个的孩子。`,
            ); // 源行 609
          } else {
            // 源行 610
            await era.printAndWait(
              `${target_name}作为公众肉便器不分昼夜地被使用着。`,
            ); // 源行 611
            await era.printAndWait(`过于残酷的生活让${she(0)}精神崩溃了。`); // 源行 612
            await era.printAndWait(`到最后，从灵魂到身体，都彻底坏掉了。`); // 源行 613
          } // 源行 614
          ending = '肉便器'; // 源行 615
        } // 源行 616
      } // 源行 617
    } else {
      // 源行 619

      if (price >= 1000000) {
        // 源行 621

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 623
          buyer = '魔王军的将军'; // 源行 624
          route = 3; // 源行 625
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 627
          buyer = '魔界贵族'; // 源行 628
          route = 2; // 源行 629
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 631
          buyer = '堕落神的神官长'; // 源行 632
          route = 1; // 源行 633
        } else {
          // 源行 635
          buyer = '魔界土豪'; // 源行 636
          route = 0; // 源行 637
        } // 源行 638
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 639
        await era.printAndWait(`………`); // 源行 640
        await era.printAndWait(`……`); // 源行 641
        await era.printAndWait(`…`); // 源行 642

        if (route == 3) {
          // 源行 644

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 646
            await era.printAndWait(
              `${target_name}的蜜壶，不管被怎么粗暴对待都只会产生快感。私处紧紧地按摩着将军的阴茎，让他也快感连连。`,
            ); // 源行 647
            await era.printAndWait(
              `迷人的肉体以及作为原勇者的经历，也是将军非常中意的地方。`,
            ); // 源行 648
            await era.printAndWait(
              `将军疼爱得就差亲手喂饭给${she(0)}吃了，对于异族性奴隶来说，是难得得好待遇。`,
            ); // 源行 649
          } else {
            // 源行 650
            await era.printAndWait(`将军对${target_name}的肉穴相当粗暴。`); // 源行 651
            await era.printAndWait(
              `作为性奴隶，每晚都被狠狠侵犯，像是要玩坏一般。`,
            ); // 源行 652
            await era.printAndWait(
              `如果真被玩坏了的话，将军的屋里可能又要多一具标本了吧。`,
            ); // 源行 653
          } // 源行 654
          ending = '魔界将军的性奴'; // 源行 655
        } else if (route == 2) {
          // 源行 657

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 659
            await era.printAndWait(`${target_name}因为傲人的双峰被看上了。`); // 源行 660
            await era.printAndWait(
              `用皮质的拘束衣托起丰满的乳房，上面用乳环及针刺的伤痕漂亮地点缀着。`,
            ); // 源行 661
            await era.printAndWait(`成为了主人放置宝石的上等人体家具。`); // 源行 662
            ending = '人体家具'; // 源行 663
          } else {
            // 源行 664
            await era.printAndWait(
              `作为主人专用宠物的${target_name}，在主人有意不弄伤的情况下用拘束具锁着。`,
            ); // 源行 665
            await era.printAndWait(`经常四肢着地，像狗一样地爬行着。`); // 源行 666
            await era.printAndWait(
              `完全萌生了作为宠物的自觉，只要主人命令，便马上作为牝犬和其它宠物交配。`,
            ); // 源行 667
            ending = '贵族的宠物'; // 源行 668
          } // 源行 669
        } else if (route == 1) {
          // 源行 671

          if (era.get(`talent:${cid}:77`) == 1) {
            // 源行 673
            await era.printAndWait(
              `让信仰其它神的人改信堕落神，也是神官长的一项重要工作。`,
            ); // 源行 674
            await era.printAndWait(
              `${target_name}被神官长粗硬的阴茎侵犯着肛门，听他说了一天的教。`,
            ); // 源行 675
            await era.printAndWait(
              `曾经被你攻陷的${target_name}，看来改信堕落神也只是时间问题了吧。`,
            ); // 源行 676
            ending = '菊奴女神官'; // 源行 677
          } else {
            // 源行 678
            await era.printAndWait(
              `成为神官长奴隶的${target_name}，每晚都参加妖邪的仪式。`,
            ); // 源行 679
            await era.printAndWait(`对于信奉正神的人来说，是肮脏不堪的仪式。`); // 源行 680
            await era.printAndWait(
              `但曾经被你攻陷的${target_name}，现在则认为这是相当有魅力的仪式，积极地参加着。`,
            ); // 源行 681
            ending = '性奴女神官'; // 源行 682
          } // 源行 683
        } else if (route == 0) {
          // 源行 685

          if (era.get(`abl:${cid}:15`) >= 5) {
            // 源行 687
            await era.printAndWait(
              `${target_name}本来只是作为性奴隶被买回来，土豪却意外地发现${she(0)}相当能说会道。`,
            ); // 源行 688
            await era.printAndWait(
              `为了让商谈取得优势，经常把${she(0)}当做夜晚的宴客工具，`,
            ); // 源行 689
            await era.printAndWait(
              `${target_name}在主人的指示下与其它男人发生关系，多次怀孕并分娩了。`,
            ); // 源行 690
            ending = '宴客性奴'; // 源行 691
          } else {
            // 源行 692
            await era.printAndWait(
              `作为土豪宠物的${target_name}，对主人相当顺从。`,
            ); // 源行 693
            await era.printAndWait(
              `土豪的众多孩子们也很喜欢可爱的${she(0)}，作为宠物被多次弄怀孕并分娩了。`,
            ); // 源行 694
            await era.printAndWait(
              `${she(0)}已经得到了作为宠物的最高幸福了吧。`,
            ); // 源行 695
            ending = '土豪的宠物'; // 源行 696
          } // 源行 697
        } // 源行 698
      } else if (price >= 500000) {
        // 源行 700

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 702
          buyer = '黑帮首领'; // 源行 703
          route = 3; // 源行 704
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 706
          buyer = '魔界地方领主'; // 源行 707
          route = 2; // 源行 708
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 710
          buyer = '堕落神的神殿'; // 源行 711
          route = 1; // 源行 712
        } else {
          // 源行 714
          buyer = '魔界的大商人'; // 源行 715
          route = 0; // 源行 716
        } // 源行 717
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 718
        await era.printAndWait(`………`); // 源行 719
        await era.printAndWait(`……`); // 源行 720
        await era.printAndWait(`…`); // 源行 721

        if (route == 3) {
          // 源行 723

          if (era.get(`talent:${cid}:203`) == 1) {
            // 源行 725
            await era.printAndWait(
              `${target_name}作为顺从的宠物与主人一起努力着。`,
            ); // 源行 726
            await era.printAndWait(
              `以前也试过多次逃走，但是发现奴隶项圈和奴隶手铐根本无法靠自己取下来之后变得老实了。`,
            ); // 源行 727
            await era.printAndWait(
              `主人对这样的${target_name}非常疼爱，给予了${she(0)}比较宽松的自由。`,
            ); // 源行 728
          } else {
            // 源行 729
            await era.printAndWait(
              `${target_name}作为顺从的宠物与主人一起努力着。`,
            ); // 源行 730
            await era.printAndWait(
              `因为身体已经堕落了，${target_name}完全记不起自己曾经身为勇者。`,
            ); // 源行 731
            await era.printAndWait(`被主人践踏也会产生快感。`); // 源行 732
          } // 源行 733
          ending = '驯化的宠物'; // 源行 734
        } else if (route == 2) {
          // 源行 736

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 738
            await era.printAndWait(`负责提供母乳的${target_name}，`); // 源行 739
            await era.printAndWait(`和挤奶工一起住小屋里。`); // 源行 740
            await era.printAndWait(
              `茶会的时候，则自己用手把母乳挤出来，为主人提供鲜榨乳汁。`,
            ); // 源行 741
            ending = '人形奶牛'; // 源行 742
          } else {
            // 源行 743
            await era.printAndWait(`${target_name}成为了供客人使用的肉被子，`); // 源行 744
            await era.printAndWait(
              `接待了不同种族的不少客人，甚至取得了广泛的好评。`,
            ); // 源行 745
            await era.printAndWait(
              `生下了几个孩子。在宅邸里被男仆和女仆们共同抚养着。`,
            ); // 源行 746
            ending = '宴客肉被子'; // 源行 747
          } // 源行 748
        } else if (route == 1) {
          // 源行 750

          if (era.get(`talent:${cid}:77`) == 1) {
            // 源行 752
            await era.printAndWait(
              `神殿新设置了堕落神的贡品，${target_name}作为奴隶要因此为神殿献出身心。`,
            ); // 源行 753
            await era.printAndWait(
              `因为被异族和异教徒侵犯也算是一种功德，${target_name}在信徒中得到了很高的人气。`,
            ); // 源行 754
            await era.printAndWait(
              `所有的阴茎都被那淫乱的肛门接受了，好像这样子就能让堕落神高兴似的，不断奉献着。`,
            ); // 源行 755
            ending = '神殿的菊奴'; // 源行 756
          } else {
            // 源行 757
            await era.printAndWait(
              `神殿新设置了堕落神的贡品，${target_name}作为贡品，被堕落信徒没完没了地侵犯着。`,
            ); // 源行 758
            await era.printAndWait(
              `侵犯异族和异教徒的女人也算是一种功德，信徒们每天都为侵犯${she(0)}而排起了长队。`,
            ); // 源行 759
            await era.printAndWait(
              `以前信仰其它神的${target_name}早晚也会从心底变成堕落神的信徒了吧。`,
            ); // 源行 760
            ending = '神殿的性奴'; // 源行 761
          } // 源行 762
        } else if (route == 0) {
          // 源行 764

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 766
            await era.printAndWait(
              `${target_name}作为员工们的肉便器被放置在公司。`,
            ); // 源行 767
            await era.printAndWait(`十几年间，生下了许多不知父亲是谁的孩子。`); // 源行 768
            await era.printAndWait(
              `生下的孩子也马上作为肉便器被卖掉了，那些钱拿来做了${target_name}的生活费。`,
            ); // 源行 769
            ending = '肉便器'; // 源行 770
          } else {
            // 源行 771
            await era.printAndWait(
              `作为宠物被买下的${target_name}老实的顺从着自己的主人。`,
            ); // 源行 772
            await era.printAndWait(
              `原勇者的自尊心已经彻底粉碎了，完全作为宠物被教育，甚至受到了好评。`,
            ); // 源行 773
            await era.printAndWait(
              `「如果再懂得一些技艺，就能参加宠物品评会了吧！」主人这么说道。`,
            ); // 源行 774
            ending = '大商人的宠物'; // 源行 775
          } // 源行 776
        } // 源行 777
      } else if (price >= 100000) {
        // 源行 779

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 781
          buyer = '魔王军的士官'; // 源行 782
          route = 3; // 源行 783
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:201`) == 1
        ) {
          // 源行 785
          buyer = '魔界学院'; // 源行 786
          route = 2; // 源行 787
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 789
          buyer = '魔界大农场'; // 源行 790
          route = 1; // 源行 791
        } else {
          // 源行 793
          buyer = '魔界商人'; // 源行 794
          route = 0; // 源行 795
        } // 源行 796
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 797
        await era.printAndWait(`………`); // 源行 798
        await era.printAndWait(`……`); // 源行 799
        await era.printAndWait(`…`); // 源行 800

        if (route == 3) {
          // 源行 802

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 804
            await era.printAndWait(
              `士官将第一次军功的奖金，交给了${target_name}，`,
            ); // 源行 805
            await era.printAndWait(
              `对年轻的士官来说，与其说是性奴隶，不如说是可爱的恋人更为贴切。`,
            ); // 源行 806
            await era.printAndWait(
              `看着每晚都服侍自己阴茎的${she(0)}，士官对${target_name}越来越爱怜了。`,
            ); // 源行 807
          } else {
            // 源行 808
            await era.printAndWait(
              `士官将第一次军功的奖金，交给了${target_name}，`,
            ); // 源行 809
            await era.printAndWait(
              `对年轻的士官来说，与其说是性奴隶，不如说是可爱的恋人更为贴切。`,
            ); // 源行 810
            await era.printAndWait(
              `并未完全屈服的${target_name}，每天都半推半就地被士官品尝着身体。`,
            ); // 源行 811
          } // 源行 812
          ending = '士官的性奴'; // 源行 813
        } else if (route == 2) {
          // 源行 815

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 817
            await era.printAndWait(
              `${target_name}那双有魅力的乳房，被注射了学院还在开发中的药剂。`,
            ); // 源行 818
            await era.printAndWait(
              `作为乳房淫虫的培养基，乳房中蠢蠢欲动的淫虫分泌着奇妙的体液，给予${she(0)}持续的甜美快感。`,
            ); // 源行 819
            await era.printAndWait(
              `如果这个实验成功的话，市面上应该就会多出一种新的媚药了吧。`,
            ); // 源行 820
            ending = '淫虫的苗床'; // 源行 821
          } else {
            // 源行 822
            await era.printAndWait(
              `作为学生的性处理便器而购买的${target_name}每天都被学生们侵犯。`,
            ); // 源行 823
            await era.printAndWait(`哪怕在上课途中，被学生侵犯也是常态。`); // 源行 824
            await era.printAndWait(
              `这种时候，老师就会以「妨碍学生上课」为由鞭打${target_name}。`,
            ); // 源行 825
            await era.printAndWait(
              `听着被鞭打的${target_name}的惨叫响彻教室，学生们的欲望更加高涨了。`,
            ); // 源行 826
            ending = '学生的玩具'; // 源行 827
          } // 源行 828
        } else if (route == 1) {
          // 源行 830

          if (era.get(`talent:${cid}:77`) == 1) {
            // 源行 832
            await era.printAndWait(
              `大农场主在买农奴的时候顺便买下了${target_name}。`,
            ); // 源行 833
            await era.printAndWait(`过着谁都可以将其玩弄的奴隶生活。`); // 源行 834
            await era.printAndWait(
              `被巨大阴茎连续侵犯的结果，就是${she(0)}现在只能摊在床上，还略带有脱肛。`,
            ); // 源行 835
            ending = '农场主的菊奴'; // 源行 836
          } else {
            // 源行 837
            await era.printAndWait(
              `大农场主在买农奴的时候顺便买下了${target_name}。`,
            ); // 源行 838
            await era.printAndWait(
              `作为给大农场主儿子们的礼物，${target_name}被彻底地玩弄着，怀孕了。`,
            ); // 源行 839
            await era.printAndWait(`据说现在作为所有人的生育奴隶被疼爱着。`); // 源行 840
            ending = '农场主的性奴'; // 源行 841
          } // 源行 842
        } else if (route == 0) {
          // 源行 844

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 846
            await era.printAndWait(
              `之前的肉便器崩溃了，作为新的肉便器被放置在厕所里。`,
            ); // 源行 847
            await era.printAndWait(`无论是客人还是员工都可以使用。`); // 源行 848
            await era.printAndWait(
              `终于到了出产秀的时候，会生出什么样的孩子还被设立了赌局。`,
            ); // 源行 849
          } else {
            // 源行 850
            await era.printAndWait(`${target_name}作为素材被妖术师买下了。`); // 源行 851
            await era.printAndWait(`妖术师为如何使用原勇者这种素材而烦恼着。`); // 源行 852
            await era.printAndWait(
              `「反正听听客人怎么说，按顾客的喜欢来改造总不会错吧。」`,
            ); // 源行 853
          } // 源行 854
          ending = '肉便器'; // 源行 855
        } // 源行 856
      } else {
        // 源行 858

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 860
          buyer = '魔界的矿山主'; // 源行 861
          route = 3; // 源行 862
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 864
          buyer = '魔界的酒吧'; // 源行 865
          route = 2; // 源行 866
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 868
          buyer = '魔界的农场'; // 源行 869
          route = 1; // 源行 870
        } else {
          // 源行 872
          buyer = '街角的公厕'; // 源行 873
          route = 0; // 源行 874
        } // 源行 875
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 876
        await era.printAndWait(`………`); // 源行 877
        await era.printAndWait(`……`); // 源行 878
        await era.printAndWait(`…`); // 源行 879

        if (route == 3) {
          // 源行 881

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 883
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            ); // 源行 884
            await era.printAndWait(
              `连续被侵犯几次都未屈服。于是侵犯变得越来越粗暴了。`,
            ); // 源行 885
          } else {
            // 源行 886
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            ); // 源行 887
            await era.printAndWait(
              `好几次被侵犯时都嚎啕大哭，矿工们觉得很有意思，令${she(0)}相当受欢迎。`,
            ); // 源行 888
          } // 源行 889
          ending = '矿山性奴'; // 源行 890
        } else if (route == 2) {
          // 源行 892

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 894
            await era.printAndWait(
              `看中了${target_name}傲人胸部的魅力，于是让${she(0)}赤裸上身接待客人。`,
            ); // 源行 895
            await era.printAndWait(
              `客人们毫不客气地把玩${she(0)}的乳房，作为奴隶的${she(0)}只能忍耐。`,
            ); // 源行 896
            await era.printAndWait(
              `为了帮自己赎身，每晚都很在意客人的小费，有时会故意挺胸让客人们玩。`,
            ); // 源行 897
          } else {
            // 源行 898
            await era.printAndWait(
              `店主对客人介绍${she(0)}的时候，会特意提醒${she(0)}可以出台。`,
            ); // 源行 899
            await era.printAndWait(
              `作为异族女孩${target_name}还是相当有人气的，不过皮肉钱绝大部分都被主人拿走，没留下多少给${she(0)}。`,
            ); // 源行 900
          } // 源行 901
          ending = '酒馆女侍应'; // 源行 902
        } else if (route == 1) {
          // 源行 904

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 906
            await era.printAndWait(
              `看中了${target_name}丰满的乳房，被作为牛奴隶栓到厩舍里。`,
            ); // 源行 907
            await era.printAndWait(
              `怀上了牛系魔兽的孩子，乳房还被注射了肥大化的药剂，作为乳牛每天被榨乳。`,
            ); // 源行 908
            ending = '乳牛奴隶'; // 源行 909
          } else {
            // 源行 910
            await era.printAndWait(
              `为了做出新品种的家畜让${target_name}和一切的家畜交配。`,
            ); // 源行 911
            await era.printAndWait(
              `还没有什么实验成果，不过持续下去，应该不久就见效了吧。`,
            ); // 源行 912
            ending = '异种交配家畜'; // 源行 913
          } // 源行 914
        } else if (route == 0) {
          // 源行 916

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 918
            await era.printAndWait(`作为现役肉便器继续侍奉着。`); // 源行 919
            await era.printAndWait(
              `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
            ); // 源行 920
            await era.printAndWait(`好像生下了不下一百个的孩子。`); // 源行 921
          } else {
            // 源行 922
            await era.printAndWait(
              `${target_name}作为公众肉便器不分昼夜地被使用着。`,
            ); // 源行 923
            await era.printAndWait(`过于残酷的生活让${she(0)}精神崩溃了。`); // 源行 924
            await era.printAndWait(
              `多次呐喊着曾经作为主人的你的名字，最后终于完全坏掉了。`,
            ); // 源行 925
          } // 源行 926
        } // 源行 927
        ending = '肉便器'; // 源行 928
      } // 源行 929
    } // 源行 930
  } else if (era.get(`talent:${cid}:76`)) {
    // 源行 932

    if (era.get(`talent:${cid}:314`) == 9) {
      // 源行 934

      if (price >= 1000000) {
        // 源行 936

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 938
          buyer = '魔界的谍报机关'; // 源行 939
          route = 3; // 源行 940
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 942
          buyer = '魔界的高级妓院'; // 源行 943
          route = 2; // 源行 944
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 946
          buyer = '堕落神的神官长'; // 源行 947
          route = 1; // 源行 948
        } else {
          // 源行 950
          buyer = '魔界大富豪'; // 源行 951
          route = 0; // 源行 952
        } // 源行 953
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 954
        await era.printAndWait(`………`); // 源行 955
        await era.printAndWait(`……`); // 源行 956
        await era.printAndWait(`…`); // 源行 957

        if (route == 3) {
          // 源行 959

          if (era.get(`cflag:${cid}:9`) >= 100) {
            // 源行 961
            await era.printAndWait(
              `${target_name}据闻和一个山间小国的君主结婚了。`,
            ); // 源行 962
            await era.printAndWait(
              `那国王在和${she(0)}相处了一晚之后就马上发布了结婚的决定。`,
            ); // 源行 963
            await era.printAndWait(
              `你突然想起，那小国是生产魔界中为数不多的珍稀魔石的地方。`,
            ); // 源行 964
            await era.printAndWait(
              `近来，那国家好像发生了什么政变，不过这对你来说已经是无关重要的话题了吧。`,
            ); // 源行 965
            ending = '魔界的谍报员'; // 源行 966
          } else {
            // 源行 967
            await era.printAndWait(
              `作为淫魔且拥有极品身体的${target_name}对讯问官手舞足蹈着，`,
            ); // 源行 968
            await era.printAndWait(
              `无论男女都被${she(0)}吸干精气而死，面对这样的身姿，其他讯问官都胆怯地跑掉了。`,
            ); // 源行 969
            await era.printAndWait(
              `这样的生活，对于${target_name}来说，也算是一种幸福了吧。`,
            ); // 源行 970
            ending = '谍报组织的提审官'; // 源行 971
          } // 源行 972
        } else if (route == 2) {
          // 源行 974

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 976
            await era.printAndWait(
              `${target_name}彻底堕落的身体让所有客人都很尽兴。从现在这个在男人身上淫乱不堪的样子，根本无法想象${she(0)}曾经作为勇者挥剑战斗。`,
            ); // 源行 977
            await era.printAndWait(
              `面对整晚都在渴求阴茎的${she(0)}，有熟客说不如让他手下的一个小队来玩轮奸秀吧！`,
            ); // 源行 978
            await era.printAndWait(
              `结果留下了光靠乳交就榨干了一个小队的精液这样的轶事。`,
            ); // 源行 979
            ending = '乳交娼妇'; // 源行 980
          } else {
            // 源行 981
            await era.printAndWait(
              `${target_name}彻底堕落的身体让所有客人都很尽兴。从现在这个在男人身上淫乱不堪的样子，根本无法想象${she(0)}曾经作为勇者挥剑战斗。`,
            ); // 源行 982
            await era.printAndWait(
              `一天到晚都在渴求阴茎，还曾发生把初次接待的客人榨干致死的事。`,
            ); // 源行 983
            await era.printAndWait(
              `没有三个人一起上是搞不定${she(0)}的，传出这样的传闻，让预约${she(0)}的客人反而大大增加了。`,
            ); // 源行 984
            ending = '高级娼妇'; // 源行 985
          } // 源行 986
        } else if (route == 1) {
          // 源行 988

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 990
            await era.printAndWait(
              `成熟了的淫乱魔族的肉体，是堕落神最好的祭品之一。`,
            ); // 源行 991
            await era.printAndWait(
              `神官长使用秘术，活祭${target_name}的仪式取得了成功。`,
            ); // 源行 992
            await era.printAndWait(
              `现在${target_name}已脱离了现世，去堕落神身边体验永恒的快乐了。`,
            ); // 源行 993
            ending = '堕落神的祭品'; // 源行 994
          } else {
            // 源行 995
            await era.printAndWait(`${target_name}被带到神殿的深处。`); // 源行 996
            await era.printAndWait(
              `以神官长为首的神官们，对${target_name}使用了秘术。`,
            ); // 源行 997
            await era.printAndWait(
              `「堕落神即将降临」「神殿新的祭品」「默示录即将开始」等等稀奇古怪的传言，对你来说是无关重要的事了吧……`,
            ); // 源行 998
            ending = '堕落神的巫女'; // 源行 999
          } // 源行 1000
        } else if (route == 0) {
          // 源行 1002

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1004
            await era.printAndWait(
              `「知道主人为${she(0)}花费了多少吗？」正当客人这样窃窃私语的时候，${target_name}在掌声中入场了。`,
            ); // 源行 1005
            await era.printAndWait(
              `被带上台的${target_name}腹部夸张地隆起，能看出快要临盘了。`,
            ); // 源行 1006
            await era.printAndWait(
              `排卵诱发剂让${she(0)}同时多重怀孕了，也进一步注射了阵痛诱发剂。`,
            ); // 源行 1007
            await era.printAndWait(
              `今晚的出产秀，到底会生出个什么呢？大家都拭目以待。`,
            ); // 源行 1008
            ending = '妊娠便器'; // 源行 1009
          } else {
            // 源行 1010
            await era.printAndWait(
              `「知道${she(0)}的主人为${she(0)}花费了多少吗？」正当客人这样窃窃私语的时候，${target_name}在掌声中入场了。`,
            ); // 源行 1011
            await era.printAndWait(
              `被车子推上台的${target_name}的股间被两根巨大的假阳具撑开到极限。`,
            ); // 源行 1012
            await era.printAndWait(
              `因肉奴隶出色的状态而兴奋非常的客人们，催促着主人把手伸向${target_name}……`,
            ); // 源行 1013
            ending = '扩张奴隶'; // 源行 1014
          } // 源行 1015
        } // 源行 1016
      } else if (price >= 500000) {
        // 源行 1018

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1020
          buyer = '魔王军的高级将校'; // 源行 1021
          route = 3; // 源行 1022
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1024
          buyer = '魔界的高级酒吧'; // 源行 1025
          route = 2; // 源行 1026
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1028
          buyer = '堕落神的神殿'; // 源行 1029
          route = 1; // 源行 1030
        } else {
          // 源行 1032
          buyer = '魔界的好事之徒'; // 源行 1033
          route = 0; // 源行 1034
        } // 源行 1035
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1036
        await era.printAndWait(`………`); // 源行 1037
        await era.printAndWait(`……`); // 源行 1038
        await era.printAndWait(`…`); // 源行 1039

        if (route == 3) {
          // 源行 1041

          if (era.get(`cflag:${cid}:9`) >= 50) {
            // 源行 1043
            await era.printAndWait(
              `${target_name}现在作为主人的保镖兼情人生活着。`,
            ); // 源行 1044
            await era.printAndWait(
              `即使已经堕落了，原勇者的战斗力也是不容小视的。`,
            ); // 源行 1045
            await era.printAndWait(
              `发情生疼的淫靡肉体，也每晚都被主人疼爱着。`,
            ); // 源行 1046
            ending = '高级将校的保镖'; // 源行 1047
          } else {
            // 源行 1048
            await era.printAndWait(`${target_name}现在作为主人的情人生活着。`); // 源行 1049
            await era.printAndWait(
              `淫媚的肉体，每晚都接受着主人过剩性欲的糟蹋。`,
            ); // 源行 1050
            await era.printAndWait(
              `至今为止已经玩坏了许多奴隶的主人，貌似终于找到一个可以承受他日夜征讨的性奴隶了。`,
            ); // 源行 1051
            ending = '高级将校的情人'; // 源行 1052
          } // 源行 1053
        } else if (route == 2) {
          // 源行 1055

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1057
            await era.printAndWait(
              `${target_name}与其说是女服务员，不如说是恳求客人交欢的妓女。`,
            ); // 源行 1058
            await era.printAndWait(
              `用高耸挺拔的乳房引诱着客人往乳沟里塞小费，事成后马上把客人拖去另一个房间。`,
            ); // 源行 1059
            await era.printAndWait(
              `似乎只要给够钱，不管什么人都可以同度春宵的样子。`,
            ); // 源行 1060
            ending = '高级酒馆的女侍应'; // 源行 1061
          } else {
            // 源行 1062
            await era.printAndWait(
              `${target_name}每晚都参加舞台上各式各样的表演。`,
            ); // 源行 1063
            await era.printAndWait(
              `从钢管舞到轮奸，从兽奸到分娩秀，什么玩法都表演过了。`,
            ); // 源行 1064
            await era.printAndWait(
              `现在，孩子都长大，还被轮奸出孙子了，但依然保持着妖艳的肉体。`,
            ); // 源行 1065
            ending = '高级酒馆的表演者'; // 源行 1066
          } // 源行 1067
        } else if (route == 1) {
          // 源行 1069

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1071
            await era.printAndWait(
              `${target_name}每天从神殿开门到神殿关门，都被信徒们侵犯着。`,
            ); // 源行 1072
            await era.printAndWait(
              `在堕落神的保佑下，即使没怀孕，也会从丰满的乳房滴出母乳来。`,
            ); // 源行 1073
            await era.printAndWait(
              `现在已经彻底沉迷在无穷的快感之中，完全变成堕落神的信徒了。`,
            ); // 源行 1074
            ending = '堕落神的信徒'; // 源行 1075
          } else {
            // 源行 1076
            await era.printAndWait(
              `${target_name}每天从神殿开门到神殿关门，都被信徒们侵犯着。`,
            ); // 源行 1077
            await era.printAndWait(
              `在信徒中有着高人气，每次都同时被好几人狠狠玩弄。`,
            ); // 源行 1078
            await era.printAndWait(
              `不过，看起来貌似对这样的生活感到很幸福的样子。`,
            ); // 源行 1079
            ending = '堕落神的性奴'; // 源行 1080
          } // 源行 1081
        } else if (route == 0) {
          // 源行 1083

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1085
            await era.printAndWait(
              `作为肉便器被放置在屋子的厕所里，无论主人、客人还是佣人，男女老少都可以使用。`,
            ); // 源行 1086
            await era.printAndWait(
              `特意请人来负责肉便器${target_name}的清洁及维护工作。`,
            ); // 源行 1087
            await era.printAndWait(
              `每使用一次都进行一遍保养，主人就是想得这么周到。`,
            ); // 源行 1088
            ending = '肉便器'; // 源行 1089
          } else {
            // 源行 1090
            await era.printAndWait(
              `${target_name}的手脚都被砍断了，作为主人的抱枕而存在着。`,
            ); // 源行 1091
            await era.printAndWait(
              `为了照顾这样的抱枕，特意雇佣了一个女仆来负责。`,
            ); // 源行 1092
            await era.printAndWait(
              `作为抱枕，好像有着无论被侵犯多少次都不够的样子。`,
            ); // 源行 1093
            ending = '好事者的抱枕'; // 源行 1094
          } // 源行 1095
        } // 源行 1096
      } else if (price >= 100000) {
        // 源行 1098

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1100
          buyer = '魔界的黑帮'; // 源行 1101
          route = 3; // 源行 1102
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1104
          buyer = '魔界的妓院'; // 源行 1105
          route = 2; // 源行 1106
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1108
          buyer = '魔界的黑酒吧'; // 源行 1109
          route = 1; // 源行 1110
        } else {
          // 源行 1112
          buyer = '魔界的赌场'; // 源行 1113
          route = 0; // 源行 1114
        } // 源行 1115
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1116
        await era.printAndWait(`………`); // 源行 1117
        await era.printAndWait(`……`); // 源行 1118
        await era.printAndWait(`…`); // 源行 1119

        if (route == 3) {
          // 源行 1121

          if (era.get(`cflag:${cid}:9`) >= 30) {
            // 源行 1123
            await era.printAndWait(
              `${target_name}成为黑社会的一员了。因为原来的勇者经历，被委以重任了。`,
            ); // 源行 1124
            await era.printAndWait(
              `每晚都用淫秽的肉体和部下交欢着，团队内部因此非常团结。`,
            ); // 源行 1125
            await era.printAndWait(
              `${target_name}在黑社会中如何生存下去真的难以预料，愿${she(0)}长寿吧……`,
            ); // 源行 1126
            ending = '黑帮成员'; // 源行 1127
          } else {
            // 源行 1128
            await era.printAndWait(
              `${target_name}成为黑社会的一员了。作为成员情妇的${target_name}每晚都要侍奉不同的男人。`,
            ); // 源行 1129
            await era.printAndWait(
              `对于一天都不能没有性爱的${she(0)}来说，也算是一个可喜的环境吧。`,
            ); // 源行 1130
            await era.printAndWait(
              `${target_name}在黑社会中如何生存下去真的难以预料，愿${she(0)}长寿吧……`,
            ); // 源行 1131
            ending = '黑社会的情妇'; // 源行 1132
          } // 源行 1133
        } else if (route == 2) {
          // 源行 1135

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1137
            await era.printAndWait(
              `${target_name}被放在橱窗里吸引客人。不知是否是妓院主人的爱好，${she(0)}的丰满的乳房被画上了下流的图案，乳头也穿了几个乳环。`,
            ); // 源行 1138
            await era.printAndWait(
              `因为这个原因，总有很多熟客找上门来。对于${target_name}这一直渴求男人的淫靡肉体来说，能每晚交欢，应该是比能挣钱还重要吧。`,
            ); // 源行 1139
            await era.printAndWait(`${she(0)}已经无法想象没有性的生活了。`); // 源行 1140
            ending = '刺青娼妇'; // 源行 1141
          } else {
            // 源行 1142
            await era.printAndWait(
              `${target_name}被放在橱窗里吸引客人。不知是否是妓院主人的爱好，${she(0)}的脸的右侧被画上了下流的图案。`,
            ); // 源行 1143
            await era.printAndWait(
              `貌似因为这个原因吸引了不少有着奇妙癖好的熟客，每晚${she(0)}的房间里都传出不间断的悲鸣。`,
            ); // 源行 1144
            await era.printAndWait(
              `对于不能没有男人的${target_name}来说，这样的生活也许也是一种幸福吧。`,
            ); // 源行 1145
            ending = '刺青娼妇'; // 源行 1146
          } // 源行 1147
        } else if (route == 1) {
          // 源行 1149

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1151
            await era.printAndWait(
              `贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`,
            ); // 源行 1152
            await era.printAndWait(
              `${target_name}被喂食了特制的母乳果实，双峰分泌出特殊的母乳了。`,
            ); // 源行 1153
            await era.printAndWait(
              `一般都是把母乳挤到杯子里，不过一些优待的客人可以直接从乳房上喝。`,
            ); // 源行 1154
            await era.printAndWait(
              `母乳里有强烈的催情成分，一般${target_name}当场就被这些客人侵犯了。`,
            ); // 源行 1155
            ending = '黑酒吧的乳奴隶'; // 源行 1156
          } else {
            // 源行 1157
            await era.printAndWait(
              `贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`,
            ); // 源行 1158
            await era.printAndWait(
              `${target_name}平常只是做一般的服务员，有时也会被一些嗑药嗑高了，或者喝多了的客人侵犯。`,
            ); // 源行 1159
            await era.printAndWait(`不过${she(0)}也挺享受这种偶发事件的。`); // 源行 1160
            ending = '黑酒吧的女侍应'; // 源行 1161
          } // 源行 1162
        } else if (route == 0) {
          // 源行 1164

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1166
            await era.printAndWait(
              `赌场为了安抚那些输了很多的客人，就会把他们带到一个侍奉房间里。`,
            ); // 源行 1167
            await era.printAndWait(
              `在里面，客人可以彻底地玩弄作为肉便器的${target_name}，`,
            ); // 源行 1168
            await era.printAndWait(`私处和肛门，被塞了很多赌场特制的筹码，`); // 源行 1169
            await era.printAndWait(
              `每天在赌场里输掉的人络绎不绝，看来今后${she(0)}都要作为肉便器玩具永远这样生活下去了。`,
            ); // 源行 1170
            ending = '赌场的肉便器'; // 源行 1171
          } else {
            // 源行 1172
            await era.printAndWait(`${target_name}成为了赌场的赠品。`); // 源行 1173
            await era.printAndWait(
              `在被买回来的当天，就被作为附加礼品送给了中了大乐透的客人。`,
            ); // 源行 1174
            await era.printAndWait(
              `不过不久之后，就作为借款的抵押，又被赌场当成赠品了。这样的事连续发生了好多次。`,
            ); // 源行 1175
            await era.printAndWait(
              `在赌徒中，开始有流言说${she(0)}是会吸取财运的魔女。`,
            ); // 源行 1176
            ending = '赌场的赠品'; // 源行 1177
          } // 源行 1178
        } // 源行 1179
      } else {
        // 源行 1181

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1183
          buyer = '魔界的酒吧'; // 源行 1184
          route = 3; // 源行 1185
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1187
          buyer = '乞丐'; // 源行 1188
          route = 2; // 源行 1189
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1191
          buyer = '触手小屋'; // 源行 1192
          route = 1; // 源行 1193
        } else {
          // 源行 1195
          buyer = '公厕'; // 源行 1196
          route = 0; // 源行 1197
        } // 源行 1198
        await era.printAndWait(`${buyer}买下${target_name}之后`); // 源行 1199
        await era.printAndWait(`………`); // 源行 1200
        await era.printAndWait(`……`); // 源行 1201
        await era.printAndWait(`…`); // 源行 1202

        if (route == 3) {
          // 源行 1204

          if (era.get(`cflag:${cid}:9`) >= 20) {
            // 源行 1206
            await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`); // 源行 1207
            await era.printAndWait(
              `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。特别的魔法，让${she(0)}被射中的痛楚都会转变为快感。`,
            ); // 源行 1208
            await era.printAndWait(
              `赢了的人，就可以当场侵犯已经发情的${target_name}，不过${she(0)}做爱如此疯狂，常常会把优胜者给榨干。`,
            ); // 源行 1209
            ending = '酒吧的赠品'; // 源行 1210
          } else {
            // 源行 1211
            await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`); // 源行 1212
            await era.printAndWait(
              `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。特别的魔法，让${she(0)}被射中的痛楚都会转变为快感。`,
            ); // 源行 1213
            await era.printAndWait(
              `赢了的人，就可以当场侵犯已经发情的${target_name}，其它的参赛者，往往也会在之后对${she(0)}进行轮奸。`,
            ); // 源行 1214
            ending = '酒吧的赠品'; // 源行 1215
          } // 源行 1216
        } else if (route == 2) {
          // 源行 1218

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1220
            await era.printAndWait(
              `晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。`,
            ); // 源行 1221
            await era.printAndWait(
              `丰满的乳房被毫不客气地玩弄着，但淫靡的肉体却无法反抗这种醉人的痛楚。`,
            ); // 源行 1222
            await era.printAndWait(
              `不过，${target_name}貌似对成为主人朋友们的宠物感到挺愉悦的。`,
            ); // 源行 1223
            ending = '乞丐的妻子'; // 源行 1224
          } else {
            // 源行 1225
            await era.printAndWait(
              `晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。`,
            ); // 源行 1226
            await era.printAndWait(
              `不过，${target_name}貌似对成为主人朋友们的宠物感到挺愉悦的。`,
            ); // 源行 1227
            ending = '乞丐的妻子'; // 源行 1228
          } // 源行 1229
        } else if (route == 1) {
          // 源行 1231

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1233
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            ); // 源行 1234
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`); // 源行 1235
            await era.printAndWait(
              `特别是膨胀到原来两倍大小的惊人豪乳所培养出来的触手更是价值连城。`,
            ); // 源行 1236
            ending = '触手的苗床'; // 源行 1237
          } else {
            // 源行 1238
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            ); // 源行 1239
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`); // 源行 1240
            await era.printAndWait(
              `完全适应了作为触手的母体，看来这样的生活会持续到${she(0)}死去的那一天。`,
            ); // 源行 1241
            ending = '触手的苗床'; // 源行 1242
          } // 源行 1243
        } else if (route == 0) {
          // 源行 1246

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1248
            await era.printAndWait(
              `被锁在公厕里的${target_name}，作为公众肉便器开始了无休止的侍奉。`,
            ); // 源行 1249
            await era.printAndWait(
              `被无尽的男人们侵犯，只是最普通的日常罢了。`,
            ); // 源行 1250
            await era.printAndWait(
              `直到${target_name}身上的锁链被解开的那天，好像为几百人生了孩子。`,
            ); // 源行 1251
            ending = '公众便所'; // 源行 1252
          } else {
            // 源行 1253
            await era.printAndWait(
              `${target_name}作为市民的公众肉便器，不分昼夜地被使用着。`,
            ); // 源行 1254
            await era.printAndWait(
              `每次被男人侵犯的时候，${she(0)}都不停地娇声呻吟着。`,
            ); // 源行 1255
            await era.printAndWait(
              `被你彻底调教的淫乱身体起了充分的反应，不断吸收着市民们的欲望。`,
            ); // 源行 1256
            ending = '公众肉便器'; // 源行 1257
          } // 源行 1258
        } // 源行 1260
      } // 源行 1261
    } else {
      // 源行 1263

      if (price >= 1000000) {
        // 源行 1265

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1267
          buyer = '魔界的间谍培训机构'; // 源行 1268
          route = 3; // 源行 1269
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1271
          buyer = '魔界的高级妓院'; // 源行 1272
          route = 2; // 源行 1273
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1275
          buyer = '堕落神的神官长'; // 源行 1276
          route = 1; // 源行 1277
        } else {
          // 源行 1279
          buyer = '魔界大富豪'; // 源行 1280
          route = 0; // 源行 1281
        } // 源行 1282
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1283
        await era.printAndWait(`………`); // 源行 1284
        await era.printAndWait(`……`); // 源行 1285
        await era.printAndWait(`…`); // 源行 1286

        if (route == 3) {
          // 源行 1288

          if (era.get(`cflag:${cid}:9`) >= 100) {
            // 源行 1290
            await era.printAndWait(
              `${target_name}在人间界被保护了的消息，你是知道的。`,
            ); // 源行 1291
            await era.printAndWait(
              `到底怎么逃出去的还不清楚，不过的确是回到了原来的王国。`,
            ); // 源行 1292
            await era.printAndWait(
              `受到了很好的治疗，不断康复，同时积极地进言向魔界进军。`,
            ); // 源行 1293
            await era.printAndWait(
              `据说引导了主流舆论，组成了相当规模的大军。`,
            ); // 源行 1294
            await era.printAndWait(
              `可是你知道，他们进军的地区是魔界中也相当有名的激战区，人类军团在那种地狱应该没有胜算吧。`,
            ); // 源行 1295
            await era.printAndWait(`而且，因为这样，那个王国现在守备空虚，`); // 源行 1296
            await era.printAndWait(`你开始盘算着如何侵略它了……`); // 源行 1297
            ending = '魔界的间谍'; // 源行 1298
          } else {
            // 源行 1299
            await era.printAndWait(
              `将所有知道的地面情报都供出了之后，被当作活教材被收容在设施里。`,
            ); // 源行 1300
            await era.printAndWait(
              `以原勇者的名头与新人对战训练，是${target_name}无聊的牢狱生活中唯一的娱乐。`,
            ); // 源行 1301
            await era.printAndWait(
              `训练生们也知道这一点，所以在对战胜利之后，也会相当彻底地凌辱${she(0)}一番。`,
            ); // 源行 1302
            ending = '间谍教材'; // 源行 1303
          } // 源行 1304
        } else if (route == 2) {
          // 源行 1307

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1309
            await era.printAndWait(
              `作为完全调教的奴隶而被买入的${target_name}，马上就被客人指名了。`,
            ); // 源行 1310
            await era.printAndWait(
              `最初的客人为了留念，在${she(0)}的乳房上留下了刺青，从那时起，老鸨就为${she(0)}推出了刺青服务。`,
            ); // 源行 1311
            await era.printAndWait(
              `各种各样的刺青，现在充斥在${target_name}高耸迷人的乳房上。`,
            ); // 源行 1312
            ending = '高级娼妇'; // 源行 1313
          } else {
            // 源行 1314
            await era.printAndWait(
              `作为完全调教的奴隶而被买入的${target_name}，马上就被客人指名了。`,
            ); // 源行 1315
            await era.printAndWait(
              `像淫魔一样变换着花式来榨取着客人的精气，${she(0)}的身姿连老鸨都看呆了。`,
            ); // 源行 1316
            await era.printAndWait(
              `实际上，${target_name}没用多久，就成为了头牌。`,
            ); // 源行 1317
            ending = '高级娼妇'; // 源行 1318
          } // 源行 1319
        } else if (route == 1) {
          // 源行 1322

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1324
            await era.printAndWait(
              `彻底被调教开发的淫乱肉体，是堕落神最好的祭品之一。`,
            ); // 源行 1325
            await era.printAndWait(`更何况是信仰其它神灵的人。`); // 源行 1326
            await era.printAndWait(
              `神官长，花了相当长的时间来传教，将${target_name}的信仰扭转，发誓完全皈依堕落神。`,
            ); // 源行 1327
            await era.printAndWait(
              `作为堕落神的教徒，会享受到一生的无尽快感吧。`,
            ); // 源行 1328
            ending = '堕落神的信徒'; // 源行 1329
          } else {
            // 源行 1330
            await era.printAndWait(`${target_name}被带到了神殿深处。`); // 源行 1331
            await era.printAndWait(
              `以神官长为首的神官们，为${she(0)}施下了淫乱的秘术。`,
            ); // 源行 1332
            await era.printAndWait(
              `准备着数百年一次的仪式，貌似打算把${she(0)}当作最后一天的祭品。`,
            ); // 源行 1333
            ending = '堕落神的巫女'; // 源行 1334
          } // 源行 1335
        } else if (route == 0) {
          // 源行 1337

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1339
            await era.printAndWait(
              `被做了手术，${target_name}作为肉便器被放在屋里。`,
            ); // 源行 1340
            await era.printAndWait(
              `手脚都被切掉了，身子和一根铁管连在一起一动也不能动。`,
            ); // 源行 1341
            await era.printAndWait(
              `一般来说这么弄要顺便洗脑的，不过主人说要保持${she(0)}的智力和意识，所以未实施。`,
            ); // 源行 1342
            await era.printAndWait(
              `通常人被这么弄早就发疯了，但被你彻底调教的${she(0)}却坚持了下来。`,
            ); // 源行 1343
            await era.printAndWait(
              `被主人和客人的尿淋满一身，${target_name}居然愉悦地绝顶了。`,
            ); // 源行 1344
            ending = '肉便器'; // 源行 1345
          } else {
            // 源行 1346
            await era.printAndWait(`${target_name}被装上台座，被放到屋里。`); // 源行 1347
            await era.printAndWait(
              `台座伸出两根巨大的假阳具，深深地插入了${she(0)}的私处及肛门，不停抽插着。`,
            ); // 源行 1348
            await era.printAndWait(
              `在同一房间内，不知有多少个与${target_name}一样处境的原勇者，被作为展品似的放置着。`,
            ); // 源行 1349
            await era.printAndWait(
              `那位大富豪貌似有这样的收藏癖，用重金把所有战败勇者都收集起来。`,
            ); // 源行 1350
            ending = '大富豪的收藏品'; // 源行 1351
          } // 源行 1352
        } // 源行 1354
      } else if (price >= 500000) {
        // 源行 1356

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1358
          buyer = '魔王军的高级将校'; // 源行 1359
          route = 3; // 源行 1360
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1362
          buyer = '魔界的高级酒吧'; // 源行 1363
          route = 2; // 源行 1364
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1366
          buyer = '堕落神的神殿'; // 源行 1367
          route = 1; // 源行 1368
        } else {
          // 源行 1370
          buyer = '魔界的好事之徒'; // 源行 1371
          route = 0; // 源行 1372
        } // 源行 1373
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1374
        await era.printAndWait(`………`); // 源行 1375
        await era.printAndWait(`……`); // 源行 1376
        await era.printAndWait(`…`); // 源行 1377

        if (route == 3) {
          // 源行 1379

          if (era.get(`cflag:${cid}:9`) >= 50) {
            // 源行 1381
            await era.printAndWait(
              `${target_name}被主人卓越的调教弄得彻底堕落了，然后被编入了魔界军。`,
            ); // 源行 1382
            await era.printAndWait(
              `原勇者的实力，让${she(0)}得心应手地指挥着部队。`,
            ); // 源行 1383
            await era.printAndWait(
              `${she(0)}的部队据说有着非常凶悍的炮友亲卫队，用疯狂的战斗热情让其它部队都感到颤抖。`,
            ); // 源行 1384
            ending = '魔界的士官'; // 源行 1385
          } else {
            // 源行 1386
            await era.printAndWait(`作为主人的其中一个新奴隶住在屋子里。`); // 源行 1387
            await era.printAndWait(
              `在宅邸里，还有几个其它种族的奴隶的照料着主人。`,
            ); // 源行 1388
            await era.printAndWait(
              `${target_name}发挥领导人的才智，把大家团结起来，互助互爱，因而得到了主人的认可，成为了奴隶长。`,
            ); // 源行 1389
            ending = '高级将校的奴隶'; // 源行 1390
          } // 源行 1391
        } else if (route == 2) {
          // 源行 1393

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1395
            await era.printAndWait(
              `${target_name}的乳头被打入了好几根乳钉，穿着露乳服装接待着客人。`,
            ); // 源行 1396
            await era.printAndWait(
              `客人们可以拔下${she(0)}乳头上的细钉，来代替叉子来食用料理。`,
            ); // 源行 1397
            await era.printAndWait(`这种服务，受到了客人们的广泛好评。`); // 源行 1398
            ending = '高级酒馆的女侍应'; // 源行 1399
          } else {
            // 源行 1400
            await era.printAndWait(
              `${target_name}被指派专门接待脾气不好的客人。但被客人责骂，${target_name}也感到相当愉悦。`,
            ); // 源行 1401
            await era.printAndWait(
              `应对性骚扰也显得游刃有余，对于淫乱的${she(0)}来说，这根本不是问题。`,
            ); // 源行 1402
            await era.printAndWait(
              `当然，为了接待怎么也不满足的客人，${she(0)}为他们留下了一间特别的侍奉房间。`,
            ); // 源行 1403
            ending = '高级酒馆的女侍应'; // 源行 1404
          } // 源行 1405
        } else if (route == 1) {
          // 源行 1408

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1410
            await era.printAndWait(
              `${target_name}每天从神殿开门到神殿关门，都被信徒们侵犯着。`,
            ); // 源行 1411
            await era.printAndWait(
              `在堕落神的保佑下，即使没怀孕，也会从丰满的乳房滴出母乳来。`,
            ); // 源行 1412
            await era.printAndWait(
              `而且，生出的孩子也被神殿所重视，重点培养了。`,
            ); // 源行 1413
            ending = '神殿的性奴'; // 源行 1414
          } else {
            // 源行 1415
            await era.printAndWait(
              `${target_name}每天从神殿开门到神殿关门，都被信徒们侵犯着。`,
            ); // 源行 1416
            await era.printAndWait(
              `作为异族以及信奉其它神的人，在信徒中有着高人气，每次都同时被数人狠狠玩弄。`,
            ); // 源行 1417
            await era.printAndWait(
              `现在，${target_name}已经成为了信仰堕落神的性巫女，将在神殿中度过余生。`,
            ); // 源行 1418
            ending = '堕落神的巫女'; // 源行 1419
          } // 源行 1420
        } else if (route == 0) {
          // 源行 1422

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1424
            await era.printAndWait(`作为男仆们和女仆们的肉便器被绑在马厩里。`); // 源行 1425
            await era.printAndWait(
              `当然，马到了发情期的时候，会狠狠地侵犯${target_name}。`,
            ); // 源行 1426
            await era.printAndWait(
              `主人有时也会身穿便服来马厩侵犯${she(0)}。脏脏的小屋里，气氛非常和谐。`,
            ); // 源行 1427
            ending = '马厩的肉便器'; // 源行 1428
          } else {
            // 源行 1429
            await era.printAndWait(`作为好事者的抱枕被使用着。`); // 源行 1430
            await era.printAndWait(
              `手脚都被切断了，被削成人棍，还被装上了一些可爱的装饰。`,
            ); // 源行 1431
            await era.printAndWait(
              `不过，也许是主人的睡相不好吧～总是在早上发现${she(0)}掉到床下正在挣扎。`,
            ); // 源行 1432
            ending = '好事者的抱枕'; // 源行 1433
          } // 源行 1434
        } // 源行 1435
      } else if (price >= 100000) {
        // 源行 1437

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1439
          buyer = '魔界的黑帮'; // 源行 1440
          route = 3; // 源行 1441
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1443
          buyer = '魔界的妓院'; // 源行 1444
          route = 2; // 源行 1445
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1447
          buyer = '魔界的黑酒吧'; // 源行 1448
          route = 1; // 源行 1449
        } else {
          // 源行 1451
          buyer = '魔界的赌场'; // 源行 1452
          route = 0; // 源行 1453
        } // 源行 1454
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1455
        await era.printAndWait(`………`); // 源行 1456
        await era.printAndWait(`……`); // 源行 1457
        await era.printAndWait(`…`); // 源行 1458

        if (route == 3) {
          // 源行 1460

          if (era.get(`abl:${cid}:2`) >= 5) {
            // 源行 1462
            await era.printAndWait(`${target_name}作为干部的情妇生活着。`); // 源行 1463
            await era.printAndWait(
              `${target_name}在干部的卓越调教下堕落了，利用${she(0)}来操纵着部下。`,
            ); // 源行 1464
            await era.printAndWait(`被放到别墅里，每晚都侍奉着不同的男人。`); // 源行 1465
            ending = '黑社会的情妇'; // 源行 1466
          } else {
            // 源行 1467
            await era.printAndWait(
              `${target_name}作为虐待狂干部的情妇生活着。`,
            ); // 源行 1468
            await era.printAndWait(
              `${she(0)}最开始也为此困惑过，不过夜晚的生活比想象中的更充实、更令${she(0)}满足。`,
            ); // 源行 1469
            await era.printAndWait(
              `每晚的过激玩法，让${target_name}彻底沉迷于这种快乐。`,
            ); // 源行 1470
            ending = '黑社会的情妇'; // 源行 1471
          } // 源行 1472
        } else if (route == 2) {
          // 源行 1475

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1477
            await era.printAndWait(`${target_name}隔着橱窗招揽客人。`); // 源行 1478
            await era.printAndWait(
              `在橱窗待了一段时间之后，${she(0)}出名了。因为袒胸露乳的衣着下，${she(0)}丰满的乳房被画上了下流的刺青，乳头也被穿上乳环。`,
            ); // 源行 1479
            await era.printAndWait(
              `虽然以后也很难把胸部藏起来了，但在熟客们的照顾下，还是过得不错。`,
            ); // 源行 1480
            ending = '橱窗娼妇'; // 源行 1481
          } else {
            // 源行 1482
            await era.printAndWait(
              `${target_name}隔着橱窗招揽客人，看上去已经习惯自己的妆容了。`,
            ); // 源行 1483
            await era.printAndWait(
              `身为异族女人好像特别受欢迎，最近每个月底都会有个魔族男人总是指名${she(0)}。`,
            ); // 源行 1484
            await era.printAndWait(
              `直接包夜，结结实实地侵犯着${she(0)}的全身，把${she(0)}弄丢几十次。`,
            ); // 源行 1485
            await era.printAndWait(
              `那人有意无意地传递着想帮${she(0)}赎身的想法，但${target_name}婉拒了。`,
            ); // 源行 1486
            ending = '橱窗娼妇'; // 源行 1487
          } // 源行 1488
        } else if (route == 1) {
          // 源行 1491

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1493
            await era.printAndWait(
              `贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`,
            ); // 源行 1494
            await era.printAndWait(
              `${target_name}被喂食了特制的母乳果实，双峰分泌出特殊的母乳了。`,
            ); // 源行 1495
            await era.printAndWait(
              `有着强力陶醉效果的母乳，如果不定期榨取，母体本身都会因此疯掉。`,
            ); // 源行 1496
            await era.printAndWait(
              `现在一直恳求被侵犯的同时，也恳求着客人来挤奶。`,
            ); // 源行 1497
            ending = '黑酒馆的瘾君子'; // 源行 1498
          } else {
            // 源行 1499
            await era.printAndWait(
              `贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。`,
            ); // 源行 1500
            await era.printAndWait(
              `${target_name}完全沉迷在毒品带来的快乐中，彻底上瘾了。整天发出甘甜、妖艳的喘息。`,
            ); // 源行 1501
            await era.printAndWait(
              `今晚，也在客人胯间努力地用嘴巴吸啜着，一但射出精液，也会满足地一饮而尽。`,
            ); // 源行 1502
            ending = '黑酒馆的瘾君子'; // 源行 1503
          } // 源行 1504
        } else if (route == 0) {
          // 源行 1506

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1508
            await era.printAndWait(
              `赌场为了安抚那些输了很多的客人，就会把他们带到一个侍奉房间里。`,
            ); // 源行 1509
            await era.printAndWait(
              `在里面，客人可以彻底地玩弄作为肉便器的${target_name}．`,
            ); // 源行 1510
            await era.printAndWait(`私处和肛门，被塞了很多赌场特制的筹码，`); // 源行 1511
            await era.printAndWait(
              `每天在赌场里输掉的人络绎不绝，看来今后${she(0)}都要作为肉便器玩具永远这样生活下去了。`,
            ); // 源行 1512
            ending = '赌场的肉便器'; // 源行 1513
          } else {
            // 源行 1514
            await era.printAndWait(`${target_name}成为了赌场的赠品。`); // 源行 1515
            await era.printAndWait(
              `在被买回来的当天，就被作为附加礼品送给了中了大乐透的客人。`,
            ); // 源行 1516
            await era.printAndWait(
              `不过，在那个赌场里，奴隶是可以当作赌注的。`,
            ); // 源行 1517
            await era.printAndWait(
              `${target_name}因此被作为赌注，在数十个赌徒之间被不停转手着。`,
            ); // 源行 1518
            ending = '赌场的赠品'; // 源行 1519
          } // 源行 1520
        } // 源行 1521
      } else {
        // 源行 1523

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1525
          buyer = '魔界的酒吧'; // 源行 1526
          route = 3; // 源行 1527
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1529
          buyer = '乞丐'; // 源行 1530
          route = 2; // 源行 1531
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1533
          buyer = '触手小屋'; // 源行 1534
          route = 1; // 源行 1535
        } else {
          // 源行 1537
          buyer = '公厕'; // 源行 1538
          route = 0; // 源行 1539
        } // 源行 1540
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1541
        await era.printAndWait(`………`); // 源行 1542
        await era.printAndWait(`……`); // 源行 1543
        await era.printAndWait(`…`); // 源行 1544

        if (route == 3) {
          // 源行 1546

          if (era.get(`abl:${cid}:2`) >= 5) {
            // 源行 1548
            await era.printAndWait(`周末，这种酒吧都会搞一些特别的竞赛。`); // 源行 1549
            await era.printAndWait(
              `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。特别的魔法，让${she(0)}被射中都不会留下伤口，而是转变为一种电击似的痛楚。`,
            ); // 源行 1550
            await era.printAndWait(
              `谁让${she(0)}惨叫得最大声，谁就会成为优胜者。竞赛在热烈的气氛中持续着。`,
            ); // 源行 1551
          } else {
            // 源行 1552
            await era.printAndWait(`周末，这种酒吧都会搞一些特别的表演。`); // 源行 1553
            await era.printAndWait(
              `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。特别的魔法，让${she(0)}被射中都不会留下伤口，而是转变为一种电击似的痛楚。`,
            ); // 源行 1554
            await era.printAndWait(
              `酒吧老板很有技巧地投掷着飞镖，让${she(0)}连晕过去都做不到，持续地惨叫着……`,
            ); // 源行 1555
          } // 源行 1556
          ending = '酒吧的赠品'; // 源行 1557
        } else if (route == 2) {
          // 源行 1560

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1562
            await era.printAndWait(
              `${target_name}晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。`,
            ); // 源行 1563
            await era.printAndWait(
              `丰满的乳房被毫不客气地玩弄着，但淫靡的肉体却无法反抗这种醉人的痛楚。`,
            ); // 源行 1564
            await era.printAndWait(
              `怀孕生下的孩子马上又被卖掉了，因此更加频繁地出租给别人。`,
            ); // 源行 1565
          } else {
            // 源行 1566
            await era.printAndWait(
              `${target_name}晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。`,
            ); // 源行 1567
            await era.printAndWait(
              `怀孕生下的孩子马上又被卖掉了，因此更加频繁地出租给别人。`,
            ); // 源行 1568
          } // 源行 1569
          ending = '乞丐的妻子'; // 源行 1570
        } else if (route == 1) {
          // 源行 1573

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1575
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            ); // 源行 1576
            await era.printAndWait(
              `被不知道几万的触手侵犯过，头脑都变得不正常了。`,
            ); // 源行 1577
            await era.printAndWait(
              `曾经漂亮的丰满乳房现在已经彻底变成触手的温床了。`,
            ); // 源行 1578
          } else {
            // 源行 1579
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            ); // 源行 1580
            await era.printAndWait(
              `被不知道几万的触手侵犯过，头脑都变得不正常了。`,
            ); // 源行 1581
            await era.printAndWait(
              `不止是私处，连直肠都无可避免地成为了触手的温床。`,
            ); // 源行 1582
          } // 源行 1583
          ending = '触手的苗床'; // 源行 1584
        } else if (route == 0) {
          // 源行 1587

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1589
            await era.printAndWait(
              `被锁在公厕里的${target_name}，作为公众肉便器开始了无休止的侍奉。`,
            ); // 源行 1590
            await era.printAndWait(
              `被地下城里各个种族的无尽的男人侵犯，对${she(0)}来说，还没有住在公厕里辛苦。`,
            ); // 源行 1591
            await era.printAndWait(
              `后来，通过了肉便器放置的法案，${target_name}被开放了。直到那天为止，好像为几百人生了孩子。`,
            ); // 源行 1592
          } else {
            // 源行 1593
            await era.printAndWait(
              `被锁在公厕里的${target_name}，作为公众肉便器开始了无休止的侍奉。`,
            ); // 源行 1594
            await era.printAndWait(
              `各个种族的男人都使用${she(0)}的身体来处理性欲。`,
            ); // 源行 1595
            await era.printAndWait(
              `后来，通过了肉便器放置的法案，${target_name}被开放了。直到那天为止，好像为几百人生了孩子。`,
            ); // 源行 1596
          } // 源行 1597
          ending = '公众肉便器'; // 源行 1598
        } // 源行 1599
      } // 源行 1600
    } // 源行 1601
  } else {
    // 源行 1603

    if (era.get(`talent:${cid}:314`) == 9) {
      // 源行 1605

      if (price >= 500000) {
        // 源行 1607

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1609
          buyer = '魔王军的高级将校'; // 源行 1610
          route = 3; // 源行 1611
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1613
          buyer = '魔界地方领主'; // 源行 1614
          route = 2; // 源行 1615
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1617
          buyer = '堕落神的神殿'; // 源行 1618
          route = 1; // 源行 1619
        } else {
          // 源行 1621
          buyer = '魔界的大商人'; // 源行 1622
          route = 0; // 源行 1623
        } // 源行 1624
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1625
        await era.printAndWait(`………`); // 源行 1626
        await era.printAndWait(`……`); // 源行 1627
        await era.printAndWait(`…`); // 源行 1628

        if (route == 3) {
          // 源行 1630

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 1632
            await era.printAndWait(
              `被改造成魔族的${target_name}，每晚都被主人温柔地对待着。`,
            ); // 源行 1633
            await era.printAndWait(
              `${she(0)}好像在主人身上感受到了在你身上感受不到的东西。`,
            ); // 源行 1634
            await era.printAndWait(`主人也觉得自己买了个好奴隶，非常满意。`); // 源行 1635
            ending = '高级将校的性奴'; // 源行 1636
          } else {
            // 源行 1637
            await era.printAndWait(`主人把${target_name}当作宠物来饲养。`); // 源行 1638
            await era.printAndWait(
              `主人整天在客人来访的时候让${she(0)}讲述自己如何作为勇者战败，最后沦落为奴隶的故事。每讲一次，都能宾主尽欢。`,
            ); // 源行 1639
            await era.printAndWait(`主人对此非常满意，认为自己买了个好奴隶。`); // 源行 1640
            ending = '高级将校的宠物'; // 源行 1641
          } // 源行 1642
        } else if (route == 2) {
          // 源行 1644

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1646
            await era.printAndWait(`${target_name}作为母乳机被放在屋内。`); // 源行 1647
            await era.printAndWait(
              `被灌下了特殊的药物，以前就很有规模的乳房，现在更加膨胀了，总是滴出母乳。`,
            ); // 源行 1648
            await era.printAndWait(
              `然后，${target_name}的母乳，总是受到主人的称赞。`,
            ); // 源行 1649
            ending = '人形奶牛'; // 源行 1650
          } else {
            // 源行 1651
            await era.printAndWait(`${target_name}被领主送给儿子当新玩具。`); // 源行 1652
            await era.printAndWait(
              `那个孩子，有着禁忌的血统的力量，传闻有时候会巨魔化然后捏碎自己的奴隶。`,
            ); // 源行 1653
            await era.printAndWait(`${she(0)}的下场，想必不会很好吧。`); // 源行 1654
            ending = '领主孩子的玩具'; // 源行 1655
          } // 源行 1656
        } else if (route == 1) {
          // 源行 1658

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1660
            await era.printAndWait(
              `${target_name}被放在神殿的角落，身边围满了呱噪的信徒们。`,
            ); // 源行 1661
            await era.printAndWait(
              `在新奴隶即将作为神殿侍奉而举行的仪式上，一整天都被信徒们持续轮奸着。`,
            ); // 源行 1662
            await era.printAndWait(
              `这一期的女孩，素质大多都差不多。但其中有着诱人双峰的${target_name}是最受欢迎的。`,
            ); // 源行 1663
            ending = '神殿的奴隶'; // 源行 1664
          } else {
            // 源行 1665
            await era.printAndWait(
              `${target_name}因为被发现信奉着其它的神，立刻被带到了地下室。`,
            ); // 源行 1666
            await era.printAndWait(
              `神官们嘲弄着${she(0)}的信仰，不停地狠狠侵犯着${she(0)}，直到蓝色肌肤完全被精液染成白色。`,
            ); // 源行 1667
            await era.printAndWait(
              `${she(0)}的理性终于被粉碎，屈服了，发誓自己将皈依堕落神。`,
            ); // 源行 1668
            ending = '堕落神的信徒'; // 源行 1669
          } // 源行 1670
        } else if (route == 0) {
          // 源行 1673

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1675
            await era.printAndWait(
              `作为肉便器被买回来的${target_name}，被装到一个专用的箱子里。`,
            ); // 源行 1676
            await era.printAndWait(
              `主人商务出差的时候，就被当做行李搬走，作为主人专用的肉便器随着出差。`,
            ); // 源行 1677
            await era.printAndWait(
              `「这是大商人的肉箱子！」，搬行李的人指着${target_name}对其它人这么说到。`,
            ); // 源行 1678
            ending = '肉便器'; // 源行 1679
          } else {
            // 源行 1680
            await era.printAndWait(
              `${target_name}作为主人的第五个性奴隶在宅邸的地下室生活着。`,
            ); // 源行 1681
            await era.printAndWait(
              `多亏了你的调教，${she(0)}早就习惯了地下的生活，很快就习惯了新环境。`,
            ); // 源行 1682
            await era.printAndWait(
              `每晚被叫去侍奉主人也是轻车熟路，对${she(0)}来说就是单纯换了个主人而已。`,
            ); // 源行 1683
            ending = '性奴隶'; // 源行 1684
          } // 源行 1685
        } // 源行 1686
      } else if (price >= 100000) {
        // 源行 1688

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1690
          buyer = '魔王军的士官'; // 源行 1691
          route = 3; // 源行 1692
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1694
          buyer = '魔界的妓院'; // 源行 1695
          route = 2; // 源行 1696
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1698
          buyer = '魔界大农场'; // 源行 1699
          route = 1; // 源行 1700
        } else {
          // 源行 1702
          buyer = '魔界的赌场'; // 源行 1703
          route = 0; // 源行 1704
        } // 源行 1705
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1706
        await era.printAndWait(`………`); // 源行 1707
        await era.printAndWait(`……`); // 源行 1708
        await era.printAndWait(`…`); // 源行 1709

        if (route == 3) {
          // 源行 1711

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 1713
            await era.printAndWait(
              `${target_name}作为奖赏，赏给立了战功的士官。`,
            ); // 源行 1714
            await era.printAndWait(
              `「这么年轻漂亮的魔族姑娘是我的奴隶」，年轻的士官还不是很适应状况，因而像恋人一样地对待${she(0)}。`,
            ); // 源行 1715
            await era.printAndWait(
              `${target_name}积极地回应着主人的疼爱，展露出与年轻的脸不相称的性交上的成熟。`,
            ); // 源行 1716
          } else {
            // 源行 1717
            await era.printAndWait(
              `${target_name}作为奖赏，赏给立了战功的士官。`,
            ); // 源行 1718
            await era.printAndWait(`士官对年轻漂亮的魔族姑娘尽情地蹂躏着。`); // 源行 1719
            await era.printAndWait(
              `要说为什么的话，刚从战场回来的士官，总是特别粗暴的。`,
            ); // 源行 1720
          } // 源行 1721
          ending = '士官的性奴'; // 源行 1722
        } else if (route == 2) {
          // 源行 1724

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1726
            await era.printAndWait(
              `${target_name}被放在橱窗里吸引客人。不知是否是妓院主人的爱好，${she(0)}的丰满的乳房被画上了下流的图案，乳头也穿了几个乳环。`,
            ); // 源行 1727
            await era.printAndWait(
              `据说在被弄上淫靡装饰的时候，${target_name}不停地在哭喊。`,
            ); // 源行 1728
            await era.printAndWait(
              `不过现在似乎已经忘记了那件事，每晚都在客人的拥抱中发出娇媚的呻吟。`,
            ); // 源行 1729
          } else {
            // 源行 1730
            await era.printAndWait(
              `${target_name}被放在橱窗里吸引客人。不知是否是妓院主人的爱好，${she(0)}的脸的右侧被画上了下流的图案。`,
            ); // 源行 1731
            await era.printAndWait(
              `据说在被弄上淫靡装饰的时候，${target_name}不停地在哭喊。`,
            ); // 源行 1732
            await era.printAndWait(
              `不过现在似乎已经忘记了那件事，总是跨坐在客人的身上发出娇媚的呻吟。`,
            ); // 源行 1733
          } // 源行 1734
          ending = '橱窗娼妇'; // 源行 1735
        } else if (route == 1) {
          // 源行 1737

          if (era.get(`talent:${cid}:77`) == 1) {
            // 源行 1739
            await era.printAndWait(
              `大农场的主人在买其它农奴的时候顺便买下了${target_name}，作为礼物送给自己的儿子们。`,
            ); // 源行 1740
            await era.printAndWait(
              `邪恶的孩子们，特别喜欢欺负${target_name}敏感的肛门。`,
            ); // 源行 1741
            await era.printAndWait(
              `此时此刻，${target_name}也正作为肛门玩具，被他们狠狠地侵犯着。`,
            ); // 源行 1742
          } else {
            // 源行 1743
            await era.printAndWait(
              `大农场的主人在买其它农奴的时候顺便买下了${target_name}，作为礼物送给自己的儿子们。`,
            ); // 源行 1744
            await era.printAndWait(
              `邪恶的孩子们，每晚都要狠狠地侵犯${target_name}。`,
            ); // 源行 1745
            await era.printAndWait(
              `没多长时间，${she(0)}怀孕了，孩子们对父亲是谁开了一个赌局。`,
            ); // 源行 1746
          } // 源行 1747
          ending = '大农场里的玩具'; // 源行 1748
        } else if (route == 0) {
          // 源行 1750

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1752
            await era.printAndWait(
              `赌场为了安抚那些输了很多的客人，就会把他们带到一个侍奉房间里。`,
            ); // 源行 1753
            await era.printAndWait(
              `在里面，客人可以彻底地玩弄作为肉便器的${target_name}。`,
            ); // 源行 1754
            await era.printAndWait(`私处和肛门，被塞了很多赌场特制的筹码，`); // 源行 1755
            await era.printAndWait(
              `每天在赌场里输掉的人络绎不绝，看来今后${she(0)}都要作为肉便器玩具永远这样生活下去了。`,
            ); // 源行 1756
            ending = '赌场肉便器'; // 源行 1757
          } else {
            // 源行 1758
            await era.printAndWait(`${target_name}成为了赌场的赠品。`); // 源行 1759
            await era.printAndWait(
              `作为美丽的魔族奴隶的${she(0)}，被漂亮地包装着，`,
            ); // 源行 1760
            await era.printAndWait(`等待着什么时候，会有新主人来把自己带走……`); // 源行 1761
            ending = '赌场赠品'; // 源行 1762
          } // 源行 1763
        } // 源行 1765
      } else {
        // 源行 1767

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1769
          buyer = '魔界的矿山主'; // 源行 1770
          route = 3; // 源行 1771
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1773
          buyer = '魔界的酒吧'; // 源行 1774
          route = 2; // 源行 1775
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1777
          buyer = '触手小屋'; // 源行 1778
          route = 1; // 源行 1779
        } else {
          // 源行 1781
          buyer = '公厕'; // 源行 1782
          route = 0; // 源行 1783
        } // 源行 1784
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1785
        await era.printAndWait(`………`); // 源行 1786
        await era.printAndWait(`……`); // 源行 1787
        await era.printAndWait(`…`); // 源行 1788

        if (route == 3) {
          // 源行 1790

          if (era.get(`abl:${cid}:2`) >= 5) {
            // 源行 1792
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            ); // 源行 1793
            await era.printAndWait(
              `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
            ); // 源行 1794
          } else {
            // 源行 1795
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            ); // 源行 1796
            await era.printAndWait(
              `好几次在被侵犯都嚎啕大哭。矿工们觉得这很有意思，令${she(0)}相当受欢迎。`,
            ); // 源行 1797
          } // 源行 1798
          ending = '矿山性奴'; // 源行 1799
        } else if (route == 2) {
          // 源行 1802

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1804
            await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`); // 源行 1805
            await era.printAndWait(
              `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。优胜者可以拿到可观的奖金。`,
            ); // 源行 1806
            await era.printAndWait(
              `在决出优胜者的时候，${she(0)}那宏伟挺拔的乳房，早已鲜血横流了。`,
            ); // 源行 1807
          } else {
            // 源行 1808
            await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`); // 源行 1809
            await era.printAndWait(
              `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。优胜者可以拿到可观的奖金。`,
            ); // 源行 1810
            await era.printAndWait(
              `在决出优胜者的时候，${she(0)}的身体已经千疮百孔，血流满地了。`,
            ); // 源行 1811
          } // 源行 1812
          ending = '酒吧的玩具'; // 源行 1813
        } else if (route == 1) {
          // 源行 1815

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1817
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            ); // 源行 1818
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`); // 源行 1819
            await era.printAndWait(
              `特别是膨胀到原来两倍大小的惊人豪乳所培养出来的触手更是价值连城。`,
            ); // 源行 1820
          } else {
            // 源行 1821
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            ); // 源行 1822
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`); // 源行 1823
            await era.printAndWait(
              `完全适应了作为触手的母体，看来这样的生活会持续到${she(0)}死去的那一天。`,
            ); // 源行 1824
          } // 源行 1825
          ending = '触手的苗床'; // 源行 1826
        } else if (route == 0) {
          // 源行 1828

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1830
            await era.printAndWait(`作为现役肉便器继续侍奉着。`); // 源行 1831
            await era.printAndWait(
              `${target_name}在相当长的时间内作为公众肉便器被广大市民所疼爱。`,
            ); // 源行 1832
            await era.printAndWait(`好像生下了不下一百个的孩子。`); // 源行 1833
          } else {
            // 源行 1834
            await era.printAndWait(
              `${target_name}作为公众肉便器不分昼夜地被使用着。`,
            ); // 源行 1835
            await era.printAndWait(
              `过于残酷的生活让${she(0)}不到半年便精神崩溃了。`,
            ); // 源行 1836
          } // 源行 1837
          ending = '公众肉便器'; // 源行 1838
        } // 源行 1840
      } // 源行 1841
    } else {
      // 源行 1843

      if (price >= 500000) {
        // 源行 1845

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1847
          buyer = '魔王军的高级将校'; // 源行 1848
          route = 3; // 源行 1849
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1851
          buyer = '魔界地方领主'; // 源行 1852
          route = 2; // 源行 1853
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1855
          buyer = '堕落神的神殿'; // 源行 1856
          route = 1; // 源行 1857
        } else {
          // 源行 1859
          buyer = '魔界的大商人'; // 源行 1860
          route = 0; // 源行 1861
        } // 源行 1862
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1863
        await era.printAndWait(`………`); // 源行 1864
        await era.printAndWait(`……`); // 源行 1865
        await era.printAndWait(`…`); // 源行 1866

        if (route == 3) {
          // 源行 1868

          if (era.get(`talent:${cid}:75`) == 1) {
            // 源行 1870
            await era.printAndWait(`主人把${she(0)}当成重要的性奴隶来看待。`); // 源行 1871
            await era.printAndWait(
              `然后，${target_name}也尽力地侍奉着主人，在主人身上感受到了在你身上感受不到的温柔。`,
            ); // 源行 1872
            await era.printAndWait(
              `虽然没有自由，但每晚都被主人充分地疼爱着，似乎过得很幸福。`,
            ); // 源行 1873
            ending = '高级将校的性奴'; // 源行 1874
          } else {
            // 源行 1875
            await era.printAndWait(`主人把${target_name}当作宠物来饲养。`); // 源行 1876
            await era.printAndWait(
              `主人整天在客人来访的时候让${she(0)}讲述自己如何作为勇者战败，最后沦落为奴隶的故事。每讲一次，都能宾主尽欢。`,
            ); // 源行 1877
            await era.printAndWait(
              `然后，客人总会轻蔑地看着${target_name}。主人每次都很享受这种时光。`,
            ); // 源行 1878
            ending = '高级将校的宠物'; // 源行 1879
          } // 源行 1880
        } else if (route == 2) {
          // 源行 1883

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1885
            await era.printAndWait(`${target_name}作为母乳机被放在屋内。`); // 源行 1886
            await era.printAndWait(
              `被灌下了特殊的药物，以前就很有规模的乳房，现在更加膨胀了，总是滴出母乳。`,
            ); // 源行 1887
            await era.printAndWait(
              `主人还特意雇佣了一个女仆来照顾${she(0)}以及加热${she(0)}的母乳。`,
            ); // 源行 1888
            ending = '人形奶牛'; // 源行 1889
          } else {
            // 源行 1890
            await era.printAndWait(`${target_name}被领主送给儿子当新玩具。`); // 源行 1891
            await era.printAndWait(
              `那个孩子，有着禁忌的血统的力量，有时候会巨魔化，然后抓起${target_name}当飞机杯使。`,
            ); // 源行 1892
            await era.printAndWait(
              `用原勇者的体质顽强地坚持着，但${target_name}看来也熬不了多久了。`,
            ); // 源行 1893
            ending = '领主孩子的玩具'; // 源行 1894
          } // 源行 1895
        } else if (route == 1) {
          // 源行 1898

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1900
            await era.printAndWait(
              `${target_name}作为侍奉神殿的女奴，整天都被信徒们侵犯着。`,
            ); // 源行 1901
            await era.printAndWait(
              `本来信奉其它神灵的${she(0)}，现在已经彻底转为信奉堕落神了。`,
            ); // 源行 1902
            await era.printAndWait(
              `那对诱人的双峰被绳子勒着，更是极大地激发起信徒们的情欲。`,
            ); // 源行 1903
            ending = '堕落神的性奴'; // 源行 1904
          } else {
            // 源行 1905
            await era.printAndWait(
              `${target_name}因为被发现信奉着其它的神，立刻被带到了地下室。`,
            ); // 源行 1906
            await era.printAndWait(
              `神官们嘲弄着${she(0)}的信仰，不停地狠狠侵犯着${she(0)}，直到全身肌肤完全被精液染成白色。`,
            ); // 源行 1907
            await era.printAndWait(
              `${she(0)}的理性终于被粉碎，屈服了，发誓自己将皈依堕落神。`,
            ); // 源行 1908
            ending = '堕落神的信徒'; // 源行 1909
          } // 源行 1910
        } else if (route == 0) {
          // 源行 1912

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1914
            await era.printAndWait(
              `最初只是作为肉便器被买回来的${target_name}，被放在主人的房间里。`,
            ); // 源行 1915
            await era.printAndWait(
              `作为主人专用的便器，在主人使用的时候，总是目不转睛地珍惜着与主人一起相处的时间。`,
            ); // 源行 1916
            await era.printAndWait(
              `被当成肉便器的${target_name}被调教的这么好，主人也很满意。`,
            ); // 源行 1917
            ending = '肉便器'; // 源行 1918
          } else {
            // 源行 1919
            await era.printAndWait(`${target_name}作为主人的宠物生活在屋里。`); // 源行 1920
            await era.printAndWait(
              `在主人的脚下撒娇着，${she(0)}已经忘记了自己曾经身为勇者了吧。`,
            ); // 源行 1921
            await era.printAndWait(`看来${she(0)}的一生也就是这样了。`); // 源行 1922
            ending = '大商人的宠物'; // 源行 1923
          } // 源行 1924
        } // 源行 1925
      } else if (price >= 100000) {
        // 源行 1927

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 1929
          buyer = '魔王军的士官'; // 源行 1930
          route = 3; // 源行 1931
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 1933
          buyer = '魔界的妓院'; // 源行 1934
          route = 2; // 源行 1935
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 1937
          buyer = '魔界大农场'; // 源行 1938
          route = 1; // 源行 1939
        } else {
          // 源行 1941
          buyer = '魔界的赌场'; // 源行 1942
          route = 0; // 源行 1943
        } // 源行 1944
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 1945
        await era.printAndWait(`………`); // 源行 1946
        await era.printAndWait(`……`); // 源行 1947
        await era.printAndWait(`…`); // 源行 1948

        if (route == 3) {
          // 源行 1950

          if (era.get(`abl:${cid}:2`) >= 5) {
            // 源行 1952
            await era.printAndWait(`年轻的士官用奖金买下了${target_name}。`); // 源行 1953
            await era.printAndWait(
              `作为异族的温驯的美女奴隶，每晚都在疼爱着。`,
            ); // 源行 1954
            await era.printAndWait(
              `${target_name}热情地接受着新主人的所有欲望。`,
            ); // 源行 1955
          } else {
            // 源行 1956
            await era.printAndWait(`年轻的士官用奖金买下了${target_name}。`); // 源行 1957
            await era.printAndWait(`作为异族的温驯美女奴隶，每晚都在疼爱着。`); // 源行 1958
            await era.printAndWait(`${target_name}用悲鸣回应着新主人的欲望。`); // 源行 1959
          } // 源行 1960
          ending = '士官的性奴'; // 源行 1961
        } else if (route == 2) {
          // 源行 1964

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1966
            await era.printAndWait(
              `${target_name}成为了专门收集异族美女的妓院里的奴隶。`,
            ); // 源行 1967
            await era.printAndWait(
              `为了让${she(0)}逃跑也跑不远，在丰满的乳房上烙下了烙印，因为过度的疼痛而晕倒了。`,
            ); // 源行 1968
            await era.printAndWait(
              `托了原勇者这个绰头的福，现在这里完全不愁客人了。`,
            ); // 源行 1969
          } else {
            // 源行 1970
            await era.printAndWait(
              `${target_name}成为了专门收集异族美女的妓院里的奴隶。`,
            ); // 源行 1971
            await era.printAndWait(
              `为了让${she(0)}逃跑也跑不远，在肩膀上烙下了烙印，因为过度的疼痛而晕倒了。`,
            ); // 源行 1972
            await era.printAndWait(
              `托了原勇者这个绰头的福，现在这里完全不愁客人了。`,
            ); // 源行 1973
          } // 源行 1974
          ending = '异种专用娼妇'; // 源行 1975
        } else if (route == 1) {
          // 源行 1978

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 1980
            await era.printAndWait(
              `${target_name}因为丰满的乳房而被看中了。作为牛奴隶被栓在厩舍里。`,
            ); // 源行 1981
            await era.printAndWait(
              `怀上了牛系魔兽的孩子，乳房还被注射了肥大化的药剂，作为乳牛每天被榨乳。`,
            ); // 源行 1982
            await era.printAndWait(
              `被榨乳的时候，${target_name}的脸上总会露出销魂的表情。`,
            ); // 源行 1983
            ending = '乳牛奴隶'; // 源行 1984
          } else {
            // 源行 1985
            await era.printAndWait(
              `为了做出新品种的家畜而让${target_name}和所有的家畜交配。`,
            ); // 源行 1986
            await era.printAndWait(
              `实验还在继续，应该能培养出意想不到的新物种吧。`,
            ); // 源行 1987
            await era.printAndWait(
              `「和魔界猪杂交出来的品种，肉应该会变得更加松软吧。」`,
            ); // 源行 1988
            ending = '家畜奴隶'; // 源行 1989
          } // 源行 1990
        } else if (route == 0) {
          // 源行 1992

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 1994
            await era.printAndWait(
              `赌场为了安抚那些输了很多的客人，就会把他们带到一个侍奉房间里。`,
            ); // 源行 1995
            await era.printAndWait(
              `在里面，客人可以彻底地玩弄作为肉便器的${target_name}。`,
            ); // 源行 1996
            await era.printAndWait(`私处和肛门，被塞了很多赌场特制的筹码，`); // 源行 1997
            await era.printAndWait(
              `每天在赌场里输掉的人络绎不绝，看来今后${target_name}都要作为肉便器玩具永远这样生活下去了。`,
            ); // 源行 1998
            ending = '赌场的肉便器'; // 源行 1999
          } else {
            // 源行 2000
            await era.printAndWait(`${target_name}成为了赌场里的赛狗。`); // 源行 2001
            await era.printAndWait(
              `被彻底调教的${she(0)}，现在只会四脚爬爬地行走了。`,
            ); // 源行 2002
            await era.printAndWait(
              `赛跑成绩不错的${target_name}，被拿去和其它赛狗配种，人们希望${she(0)}能生出更优良的赛狗。`,
            ); // 源行 2003
            ending = '赌场的狗'; // 源行 2004
          } // 源行 2005
        } // 源行 2007
      } else {
        // 源行 2009

        if (
          era.get(`talent:${cid}:200`) == 1 ||
          era.get(`talent:${cid}:203`) == 1
        ) {
          // 源行 2011
          buyer = '魔界的矿山主'; // 源行 2012
          route = 3; // 源行 2013
        } else if (
          era.get(`talent:${cid}:205`) == 1 ||
          era.get(`talent:${cid}:207`) == 1
        ) {
          // 源行 2015
          buyer = '魔界的酒吧'; // 源行 2016
          route = 2; // 源行 2017
        } else if (
          era.get(`talent:${cid}:202`) == 1 ||
          era.get(`talent:${cid}:206`) == 1
        ) {
          // 源行 2019
          buyer = '触手小屋'; // 源行 2020
          route = 1; // 源行 2021
        } else {
          // 源行 2023
          buyer = '公厕'; // 源行 2024
          route = 0; // 源行 2025
        } // 源行 2026
        await era.printAndWait(`${buyer}买下${target_name}之后………`); // 源行 2027
        await era.printAndWait(`………`); // 源行 2028
        await era.printAndWait(`……`); // 源行 2029
        await era.printAndWait(`…`); // 源行 2030

        if (route == 3) {
          // 源行 2032

          if (era.get(`abl:${cid}:2`) >= 5) {
            // 源行 2034
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            ); // 源行 2035
            await era.printAndWait(
              `连续被侵犯几次都不屈服。「再这么下去真是一点都不可爱」`,
            ); // 源行 2036
          } else {
            // 源行 2037
            await era.printAndWait(
              `${target_name}作为开矿奴隶的慰问品被饲养着。`,
            ); // 源行 2038
            await era.printAndWait(
              `${target_name}好几次在被侵犯时都会嚎啕大哭，矿工们觉得很有意思。这令${she(0)}相当受欢迎。`,
            ); // 源行 2039
          } // 源行 2040
          ending = '矿山性奴'; // 源行 2041
        } else if (route == 2) {
          // 源行 2044

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 2046
            await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`); // 源行 2047
            await era.printAndWait(
              `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。优胜者可以拿到可观的奖金。`,
            ); // 源行 2048
            await era.printAndWait(
              `在决出优胜者的时候，${she(0)}那宏伟挺拔的乳房，早已鲜血横流了。`,
            ); // 源行 2049
          } else {
            // 源行 2050
            await era.printAndWait(`周末，这种酒吧都会搞一些特别的活动。`); // 源行 2051
            await era.printAndWait(
              `${target_name}作为飞镖的靶子，参加了特别的飞镖比赛。优胜者可以拿到可观的奖金。`,
            ); // 源行 2052
            await era.printAndWait(
              `在决出优胜者的时候，${she(0)}的身体已经千疮百孔，血流满地了。`,
            ); // 源行 2053
          } // 源行 2054
          ending = '酒吧的玩具'; // 源行 2055
        } else if (route == 1) {
          // 源行 2058

          if (
            era.get(`talent:${cid}:110`) == 1 ||
            era.get(`talent:${cid}:114`) == 1 ||
            era.get(`talent:${cid}:119`) == 1
          ) {
            // 源行 2060
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            ); // 源行 2061
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`); // 源行 2062
            await era.printAndWait(
              `特别是膨胀到原来两倍大小的惊人豪乳所培养出来的触手更是价值连城。`,
            ); // 源行 2063
          } else {
            // 源行 2064
            await era.printAndWait(
              `${target_name}被安排在量产触手的触手小屋里，`,
            ); // 源行 2065
            await era.printAndWait(`不知培养了多少触手，也许成百上千了。`); // 源行 2066
            await era.printAndWait(
              `${target_name}已经完全适应了作为触手的母体，看来这样的生活会持续到${she(0)}死去的那一天。`,
            ); // 源行 2067
          } // 源行 2068
          ending = '触手的苗床'; // 源行 2069
        } else if (route == 0) {
          // 源行 2072

          if (era.get(`talent:${cid}:204`) == 1) {
            // 源行 2074
            await era.printAndWait(`作为现役肉便器继续侍奉着。`); // 源行 2075
            await era.printAndWait(
              `${target_name}在相当长的时间内，作为公众肉便器而被广大市民所疼爱。`,
            ); // 源行 2076
            await era.printAndWait(`好像生下了不下一百个的孩子。`); // 源行 2077
          } else {
            // 源行 2078
            await era.printAndWait(
              `${target_name}作为公众肉便器，不分昼夜地被使用着。`,
            ); // 源行 2079
            await era.printAndWait(
              `过于残酷的生活让${she(0)}不到半年便精神崩溃了。`,
            ); // 源行 2080
          } // 源行 2081
          ending = '公众肉便器'; // 源行 2082
        } // 源行 2083
      } // 源行 2084
    } // 源行 2085
  } // 源行 2086

  const family_id = search_family(cid);
  if (family_id >= 0) {
    chara(family_id).event.家人末路 = `${ending}${target_name}`;
  }
  era.set('tstr:30', `${ending}${target_name}`);
  await era.print('');
  await era.printAndWait(
    `就这样，${master_name}和${target_name}再也没有见面……`,
  ); // 源行 2093
  await era.print('');
  video_maturo(cid);
  return 0;
}

module.exports = { sell_maturo_k0 };
