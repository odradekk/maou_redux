// GENERATED START
const era = require('#/era-electron');

/**
 * @typedef GameBase
 * @property {string} title 游戏标题
 * @property {string} author 游戏作者
 * @property {string} info 游戏信息
 * @property {string} year 发布时间
 * @property {number} gameCode 游戏标识
 * @property {number} version 游戏版本号
 * @property {string} [versionName] 自定义游戏版本号
 * @property {number} allowVersion 最低支持版本
 * @property {number} [defaultChara] 默认角色编号
 * @property {string} [site] 发布页网址
 * @property {string} [icon] 游戏图标
 * @property {string} [versionCheck] 版本检查网址
 * @property {string} [baseZip] 程序更新网址
 */

const era_info = {
  /**
   * 游戏的基本数据
   * @returns {GameBase}
   */
  get gamebase() {
    return era.get('gamebase');
  },
  /**
   * 当前游戏存档的版本号
   * @returns {number}
   */
  get version() {
    return era.get('version');
  },
  /**
   * 游戏存档栏位的备注（存档名）<br>
   * 开发套件只支持到游戏设置中的存档数量，栏位号超出存档数量的存档备注请使用 era.get 和 era.set
   * @type {Record<string,string>}
   */
  saves: {
    /**
     * 存档0
     * @returns {string}
     */
    get 0() {
      return era['raw']().global['saves'][0];
    },
    /**
     * 存档0
     * @param {string} v
     */
    set 0(v) {
      era['raw']().global['saves'][0] = v;
    },
    /**
     * 存档1
     * @returns {string}
     */
    get 1() {
      return era['raw']().global['saves'][1];
    },
    /**
     * 存档1
     * @param {string} v
     */
    set 1(v) {
      era['raw']().global['saves'][1] = v;
    },
    /**
     * 存档2
     * @returns {string}
     */
    get 2() {
      return era['raw']().global['saves'][2];
    },
    /**
     * 存档2
     * @param {string} v
     */
    set 2(v) {
      era['raw']().global['saves'][2] = v;
    },
    /**
     * 存档3
     * @returns {string}
     */
    get 3() {
      return era['raw']().global['saves'][3];
    },
    /**
     * 存档3
     * @param {string} v
     */
    set 3(v) {
      era['raw']().global['saves'][3] = v;
    },
    /**
     * 存档4
     * @returns {string}
     */
    get 4() {
      return era['raw']().global['saves'][4];
    },
    /**
     * 存档4
     * @param {string} v
     */
    set 4(v) {
      era['raw']().global['saves'][4] = v;
    },
    /**
     * 存档5
     * @returns {string}
     */
    get 5() {
      return era['raw']().global['saves'][5];
    },
    /**
     * 存档5
     * @param {string} v
     */
    set 5(v) {
      era['raw']().global['saves'][5] = v;
    },
    /**
     * 存档6
     * @returns {string}
     */
    get 6() {
      return era['raw']().global['saves'][6];
    },
    /**
     * 存档6
     * @param {string} v
     */
    set 6(v) {
      era['raw']().global['saves'][6] = v;
    },
    /**
     * 存档7
     * @returns {string}
     */
    get 7() {
      return era['raw']().global['saves'][7];
    },
    /**
     * 存档7
     * @param {string} v
     */
    set 7(v) {
      era['raw']().global['saves'][7] = v;
    },
    /**
     * 存档8
     * @returns {string}
     */
    get 8() {
      return era['raw']().global['saves'][8];
    },
    /**
     * 存档8
     * @param {string} v
     */
    set 8(v) {
      era['raw']().global['saves'][8] = v;
    },
    /**
     * 存档9
     * @returns {string}
     */
    get 9() {
      return era['raw']().global['saves'][9];
    },
    /**
     * 存档9
     * @param {string} v
     */
    set 9(v) {
      era['raw']().global['saves'][9] = v;
    },
    /**
     * 存档10
     * @returns {string}
     */
    get 10() {
      return era['raw']().global['saves'][10];
    },
    /**
     * 存档10
     * @param {string} v
     */
    set 10(v) {
      era['raw']().global['saves'][10] = v;
    },
    /**
     * 存档11
     * @returns {string}
     */
    get 11() {
      return era['raw']().global['saves'][11];
    },
    /**
     * 存档11
     * @param {string} v
     */
    set 11(v) {
      era['raw']().global['saves'][11] = v;
    },
    /**
     * 存档12
     * @returns {string}
     */
    get 12() {
      return era['raw']().global['saves'][12];
    },
    /**
     * 存档12
     * @param {string} v
     */
    set 12(v) {
      era['raw']().global['saves'][12] = v;
    },
    /**
     * 存档13
     * @returns {string}
     */
    get 13() {
      return era['raw']().global['saves'][13];
    },
    /**
     * 存档13
     * @param {string} v
     */
    set 13(v) {
      era['raw']().global['saves'][13] = v;
    },
    /**
     * 存档14
     * @returns {string}
     */
    get 14() {
      return era['raw']().global['saves'][14];
    },
    /**
     * 存档14
     * @param {string} v
     */
    set 14(v) {
      era['raw']().global['saves'][14] = v;
    },
    /**
     * 存档15
     * @returns {string}
     */
    get 15() {
      return era['raw']().global['saves'][15];
    },
    /**
     * 存档15
     * @param {string} v
     */
    set 15(v) {
      era['raw']().global['saves'][15] = v;
    },
    /**
     * 存档16
     * @returns {string}
     */
    get 16() {
      return era['raw']().global['saves'][16];
    },
    /**
     * 存档16
     * @param {string} v
     */
    set 16(v) {
      era['raw']().global['saves'][16] = v;
    },
    /**
     * 存档17
     * @returns {string}
     */
    get 17() {
      return era['raw']().global['saves'][17];
    },
    /**
     * 存档17
     * @param {string} v
     */
    set 17(v) {
      era['raw']().global['saves'][17] = v;
    },
    /**
     * 存档18
     * @returns {string}
     */
    get 18() {
      return era['raw']().global['saves'][18];
    },
    /**
     * 存档18
     * @param {string} v
     */
    set 18(v) {
      era['raw']().global['saves'][18] = v;
    },
    /**
     * 存档19
     * @returns {string}
     */
    get 19() {
      return era['raw']().global['saves'][19];
    },
    /**
     * 存档19
     * @param {string} v
     */
    set 19(v) {
      era['raw']().global['saves'][19] = v;
    },
    /**
     * 存档20
     * @returns {string}
     */
    get 20() {
      return era['raw']().global['saves'][20];
    },
    /**
     * 存档20
     * @param {string} v
     */
    set 20(v) {
      era['raw']().global['saves'][20] = v;
    },
    /**
     * 存档21
     * @returns {string}
     */
    get 21() {
      return era['raw']().global['saves'][21];
    },
    /**
     * 存档21
     * @param {string} v
     */
    set 21(v) {
      era['raw']().global['saves'][21] = v;
    },
    /**
     * 存档22
     * @returns {string}
     */
    get 22() {
      return era['raw']().global['saves'][22];
    },
    /**
     * 存档22
     * @param {string} v
     */
    set 22(v) {
      era['raw']().global['saves'][22] = v;
    },
    /**
     * 存档23
     * @returns {string}
     */
    get 23() {
      return era['raw']().global['saves'][23];
    },
    /**
     * 存档23
     * @param {string} v
     */
    set 23(v) {
      era['raw']().global['saves'][23] = v;
    },
    /**
     * 存档24
     * @returns {string}
     */
    get 24() {
      return era['raw']().global['saves'][24];
    },
    /**
     * 存档24
     * @param {string} v
     */
    set 24(v) {
      era['raw']().global['saves'][24] = v;
    },
    /**
     * 存档25
     * @returns {string}
     */
    get 25() {
      return era['raw']().global['saves'][25];
    },
    /**
     * 存档25
     * @param {string} v
     */
    set 25(v) {
      era['raw']().global['saves'][25] = v;
    },
    /**
     * 存档26
     * @returns {string}
     */
    get 26() {
      return era['raw']().global['saves'][26];
    },
    /**
     * 存档26
     * @param {string} v
     */
    set 26(v) {
      era['raw']().global['saves'][26] = v;
    },
    /**
     * 存档27
     * @returns {string}
     */
    get 27() {
      return era['raw']().global['saves'][27];
    },
    /**
     * 存档27
     * @param {string} v
     */
    set 27(v) {
      era['raw']().global['saves'][27] = v;
    },
    /**
     * 存档28
     * @returns {string}
     */
    get 28() {
      return era['raw']().global['saves'][28];
    },
    /**
     * 存档28
     * @param {string} v
     */
    set 28(v) {
      era['raw']().global['saves'][28] = v;
    },
    /**
     * 存档29
     * @returns {string}
     */
    get 29() {
      return era['raw']().global['saves'][29];
    },
    /**
     * 存档29
     * @param {string} v
     */
    set 29(v) {
      era['raw']().global['saves'][29] = v;
    },
    /**
     * 存档30
     * @returns {string}
     */
    get 30() {
      return era['raw']().global['saves'][30];
    },
    /**
     * 存档30
     * @param {string} v
     */
    set 30(v) {
      era['raw']().global['saves'][30] = v;
    },
    /**
     * 存档31
     * @returns {string}
     */
    get 31() {
      return era['raw']().global['saves'][31];
    },
    /**
     * 存档31
     * @param {string} v
     */
    set 31(v) {
      era['raw']().global['saves'][31] = v;
    },
    /**
     * 存档32
     * @returns {string}
     */
    get 32() {
      return era['raw']().global['saves'][32];
    },
    /**
     * 存档32
     * @param {string} v
     */
    set 32(v) {
      era['raw']().global['saves'][32] = v;
    },
    /**
     * 存档33
     * @returns {string}
     */
    get 33() {
      return era['raw']().global['saves'][33];
    },
    /**
     * 存档33
     * @param {string} v
     */
    set 33(v) {
      era['raw']().global['saves'][33] = v;
    },
    /**
     * 存档34
     * @returns {string}
     */
    get 34() {
      return era['raw']().global['saves'][34];
    },
    /**
     * 存档34
     * @param {string} v
     */
    set 34(v) {
      era['raw']().global['saves'][34] = v;
    },
    /**
     * 存档35
     * @returns {string}
     */
    get 35() {
      return era['raw']().global['saves'][35];
    },
    /**
     * 存档35
     * @param {string} v
     */
    set 35(v) {
      era['raw']().global['saves'][35] = v;
    },
    /**
     * 存档36
     * @returns {string}
     */
    get 36() {
      return era['raw']().global['saves'][36];
    },
    /**
     * 存档36
     * @param {string} v
     */
    set 36(v) {
      era['raw']().global['saves'][36] = v;
    },
    /**
     * 存档37
     * @returns {string}
     */
    get 37() {
      return era['raw']().global['saves'][37];
    },
    /**
     * 存档37
     * @param {string} v
     */
    set 37(v) {
      era['raw']().global['saves'][37] = v;
    },
    /**
     * 存档38
     * @returns {string}
     */
    get 38() {
      return era['raw']().global['saves'][38];
    },
    /**
     * 存档38
     * @param {string} v
     */
    set 38(v) {
      era['raw']().global['saves'][38] = v;
    },
    /**
     * 存档39
     * @returns {string}
     */
    get 39() {
      return era['raw']().global['saves'][39];
    },
    /**
     * 存档39
     * @param {string} v
     */
    set 39(v) {
      era['raw']().global['saves'][39] = v;
    },
    /**
     * 存档40
     * @returns {string}
     */
    get 40() {
      return era['raw']().global['saves'][40];
    },
    /**
     * 存档40
     * @param {string} v
     */
    set 40(v) {
      era['raw']().global['saves'][40] = v;
    },
    /**
     * 存档41
     * @returns {string}
     */
    get 41() {
      return era['raw']().global['saves'][41];
    },
    /**
     * 存档41
     * @param {string} v
     */
    set 41(v) {
      era['raw']().global['saves'][41] = v;
    },
    /**
     * 存档42
     * @returns {string}
     */
    get 42() {
      return era['raw']().global['saves'][42];
    },
    /**
     * 存档42
     * @param {string} v
     */
    set 42(v) {
      era['raw']().global['saves'][42] = v;
    },
    /**
     * 存档43
     * @returns {string}
     */
    get 43() {
      return era['raw']().global['saves'][43];
    },
    /**
     * 存档43
     * @param {string} v
     */
    set 43(v) {
      era['raw']().global['saves'][43] = v;
    },
    /**
     * 存档44
     * @returns {string}
     */
    get 44() {
      return era['raw']().global['saves'][44];
    },
    /**
     * 存档44
     * @param {string} v
     */
    set 44(v) {
      era['raw']().global['saves'][44] = v;
    },
    /**
     * 存档45
     * @returns {string}
     */
    get 45() {
      return era['raw']().global['saves'][45];
    },
    /**
     * 存档45
     * @param {string} v
     */
    set 45(v) {
      era['raw']().global['saves'][45] = v;
    },
    /**
     * 存档46
     * @returns {string}
     */
    get 46() {
      return era['raw']().global['saves'][46];
    },
    /**
     * 存档46
     * @param {string} v
     */
    set 46(v) {
      era['raw']().global['saves'][46] = v;
    },
    /**
     * 存档47
     * @returns {string}
     */
    get 47() {
      return era['raw']().global['saves'][47];
    },
    /**
     * 存档47
     * @param {string} v
     */
    set 47(v) {
      era['raw']().global['saves'][47] = v;
    },
    /**
     * 存档48
     * @returns {string}
     */
    get 48() {
      return era['raw']().global['saves'][48];
    },
    /**
     * 存档48
     * @param {string} v
     */
    set 48(v) {
      era['raw']().global['saves'][48] = v;
    },
    /**
     * 存档49
     * @returns {string}
     */
    get 49() {
      return era['raw']().global['saves'][49];
    },
    /**
     * 存档49
     * @param {string} v
     */
    set 49(v) {
      era['raw']().global['saves'][49] = v;
    },
    /**
     * 存档50
     * @returns {string}
     */
    get 50() {
      return era['raw']().global['saves'][50];
    },
    /**
     * 存档50
     * @param {string} v
     */
    set 50(v) {
      era['raw']().global['saves'][50] = v;
    },
    /**
     * 存档51
     * @returns {string}
     */
    get 51() {
      return era['raw']().global['saves'][51];
    },
    /**
     * 存档51
     * @param {string} v
     */
    set 51(v) {
      era['raw']().global['saves'][51] = v;
    },
    /**
     * 存档52
     * @returns {string}
     */
    get 52() {
      return era['raw']().global['saves'][52];
    },
    /**
     * 存档52
     * @param {string} v
     */
    set 52(v) {
      era['raw']().global['saves'][52] = v;
    },
    /**
     * 存档53
     * @returns {string}
     */
    get 53() {
      return era['raw']().global['saves'][53];
    },
    /**
     * 存档53
     * @param {string} v
     */
    set 53(v) {
      era['raw']().global['saves'][53] = v;
    },
    /**
     * 存档54
     * @returns {string}
     */
    get 54() {
      return era['raw']().global['saves'][54];
    },
    /**
     * 存档54
     * @param {string} v
     */
    set 54(v) {
      era['raw']().global['saves'][54] = v;
    },
    /**
     * 存档55
     * @returns {string}
     */
    get 55() {
      return era['raw']().global['saves'][55];
    },
    /**
     * 存档55
     * @param {string} v
     */
    set 55(v) {
      era['raw']().global['saves'][55] = v;
    },
    /**
     * 存档56
     * @returns {string}
     */
    get 56() {
      return era['raw']().global['saves'][56];
    },
    /**
     * 存档56
     * @param {string} v
     */
    set 56(v) {
      era['raw']().global['saves'][56] = v;
    },
    /**
     * 存档57
     * @returns {string}
     */
    get 57() {
      return era['raw']().global['saves'][57];
    },
    /**
     * 存档57
     * @param {string} v
     */
    set 57(v) {
      era['raw']().global['saves'][57] = v;
    },
    /**
     * 存档58
     * @returns {string}
     */
    get 58() {
      return era['raw']().global['saves'][58];
    },
    /**
     * 存档58
     * @param {string} v
     */
    set 58(v) {
      era['raw']().global['saves'][58] = v;
    },
    /**
     * 存档59
     * @returns {string}
     */
    get 59() {
      return era['raw']().global['saves'][59];
    },
    /**
     * 存档59
     * @param {string} v
     */
    set 59(v) {
      era['raw']().global['saves'][59] = v;
    },
    /**
     * 存档60
     * @returns {string}
     */
    get 60() {
      return era['raw']().global['saves'][60];
    },
    /**
     * 存档60
     * @param {string} v
     */
    set 60(v) {
      era['raw']().global['saves'][60] = v;
    },
    /**
     * 存档61
     * @returns {string}
     */
    get 61() {
      return era['raw']().global['saves'][61];
    },
    /**
     * 存档61
     * @param {string} v
     */
    set 61(v) {
      era['raw']().global['saves'][61] = v;
    },
    /**
     * 存档62
     * @returns {string}
     */
    get 62() {
      return era['raw']().global['saves'][62];
    },
    /**
     * 存档62
     * @param {string} v
     */
    set 62(v) {
      era['raw']().global['saves'][62] = v;
    },
    /**
     * 存档63
     * @returns {string}
     */
    get 63() {
      return era['raw']().global['saves'][63];
    },
    /**
     * 存档63
     * @param {string} v
     */
    set 63(v) {
      era['raw']().global['saves'][63] = v;
    },
    /**
     * 存档64
     * @returns {string}
     */
    get 64() {
      return era['raw']().global['saves'][64];
    },
    /**
     * 存档64
     * @param {string} v
     */
    set 64(v) {
      era['raw']().global['saves'][64] = v;
    },
    /**
     * 存档65
     * @returns {string}
     */
    get 65() {
      return era['raw']().global['saves'][65];
    },
    /**
     * 存档65
     * @param {string} v
     */
    set 65(v) {
      era['raw']().global['saves'][65] = v;
    },
    /**
     * 存档66
     * @returns {string}
     */
    get 66() {
      return era['raw']().global['saves'][66];
    },
    /**
     * 存档66
     * @param {string} v
     */
    set 66(v) {
      era['raw']().global['saves'][66] = v;
    },
    /**
     * 存档67
     * @returns {string}
     */
    get 67() {
      return era['raw']().global['saves'][67];
    },
    /**
     * 存档67
     * @param {string} v
     */
    set 67(v) {
      era['raw']().global['saves'][67] = v;
    },
    /**
     * 存档68
     * @returns {string}
     */
    get 68() {
      return era['raw']().global['saves'][68];
    },
    /**
     * 存档68
     * @param {string} v
     */
    set 68(v) {
      era['raw']().global['saves'][68] = v;
    },
    /**
     * 存档69
     * @returns {string}
     */
    get 69() {
      return era['raw']().global['saves'][69];
    },
    /**
     * 存档69
     * @param {string} v
     */
    set 69(v) {
      era['raw']().global['saves'][69] = v;
    },
    /**
     * 存档70
     * @returns {string}
     */
    get 70() {
      return era['raw']().global['saves'][70];
    },
    /**
     * 存档70
     * @param {string} v
     */
    set 70(v) {
      era['raw']().global['saves'][70] = v;
    },
    /**
     * 存档71
     * @returns {string}
     */
    get 71() {
      return era['raw']().global['saves'][71];
    },
    /**
     * 存档71
     * @param {string} v
     */
    set 71(v) {
      era['raw']().global['saves'][71] = v;
    },
    /**
     * 存档72
     * @returns {string}
     */
    get 72() {
      return era['raw']().global['saves'][72];
    },
    /**
     * 存档72
     * @param {string} v
     */
    set 72(v) {
      era['raw']().global['saves'][72] = v;
    },
    /**
     * 存档73
     * @returns {string}
     */
    get 73() {
      return era['raw']().global['saves'][73];
    },
    /**
     * 存档73
     * @param {string} v
     */
    set 73(v) {
      era['raw']().global['saves'][73] = v;
    },
    /**
     * 存档74
     * @returns {string}
     */
    get 74() {
      return era['raw']().global['saves'][74];
    },
    /**
     * 存档74
     * @param {string} v
     */
    set 74(v) {
      era['raw']().global['saves'][74] = v;
    },
    /**
     * 存档75
     * @returns {string}
     */
    get 75() {
      return era['raw']().global['saves'][75];
    },
    /**
     * 存档75
     * @param {string} v
     */
    set 75(v) {
      era['raw']().global['saves'][75] = v;
    },
    /**
     * 存档76
     * @returns {string}
     */
    get 76() {
      return era['raw']().global['saves'][76];
    },
    /**
     * 存档76
     * @param {string} v
     */
    set 76(v) {
      era['raw']().global['saves'][76] = v;
    },
    /**
     * 存档77
     * @returns {string}
     */
    get 77() {
      return era['raw']().global['saves'][77];
    },
    /**
     * 存档77
     * @param {string} v
     */
    set 77(v) {
      era['raw']().global['saves'][77] = v;
    },
    /**
     * 存档78
     * @returns {string}
     */
    get 78() {
      return era['raw']().global['saves'][78];
    },
    /**
     * 存档78
     * @param {string} v
     */
    set 78(v) {
      era['raw']().global['saves'][78] = v;
    },
    /**
     * 存档79
     * @returns {string}
     */
    get 79() {
      return era['raw']().global['saves'][79];
    },
    /**
     * 存档79
     * @param {string} v
     */
    set 79(v) {
      era['raw']().global['saves'][79] = v;
    },
    /**
     * 存档80
     * @returns {string}
     */
    get 80() {
      return era['raw']().global['saves'][80];
    },
    /**
     * 存档80
     * @param {string} v
     */
    set 80(v) {
      era['raw']().global['saves'][80] = v;
    },
    /**
     * 存档81
     * @returns {string}
     */
    get 81() {
      return era['raw']().global['saves'][81];
    },
    /**
     * 存档81
     * @param {string} v
     */
    set 81(v) {
      era['raw']().global['saves'][81] = v;
    },
    /**
     * 存档82
     * @returns {string}
     */
    get 82() {
      return era['raw']().global['saves'][82];
    },
    /**
     * 存档82
     * @param {string} v
     */
    set 82(v) {
      era['raw']().global['saves'][82] = v;
    },
    /**
     * 存档83
     * @returns {string}
     */
    get 83() {
      return era['raw']().global['saves'][83];
    },
    /**
     * 存档83
     * @param {string} v
     */
    set 83(v) {
      era['raw']().global['saves'][83] = v;
    },
    /**
     * 存档84
     * @returns {string}
     */
    get 84() {
      return era['raw']().global['saves'][84];
    },
    /**
     * 存档84
     * @param {string} v
     */
    set 84(v) {
      era['raw']().global['saves'][84] = v;
    },
    /**
     * 存档85
     * @returns {string}
     */
    get 85() {
      return era['raw']().global['saves'][85];
    },
    /**
     * 存档85
     * @param {string} v
     */
    set 85(v) {
      era['raw']().global['saves'][85] = v;
    },
    /**
     * 存档86
     * @returns {string}
     */
    get 86() {
      return era['raw']().global['saves'][86];
    },
    /**
     * 存档86
     * @param {string} v
     */
    set 86(v) {
      era['raw']().global['saves'][86] = v;
    },
    /**
     * 存档87
     * @returns {string}
     */
    get 87() {
      return era['raw']().global['saves'][87];
    },
    /**
     * 存档87
     * @param {string} v
     */
    set 87(v) {
      era['raw']().global['saves'][87] = v;
    },
    /**
     * 存档88
     * @returns {string}
     */
    get 88() {
      return era['raw']().global['saves'][88];
    },
    /**
     * 存档88
     * @param {string} v
     */
    set 88(v) {
      era['raw']().global['saves'][88] = v;
    },
    /**
     * 存档89
     * @returns {string}
     */
    get 89() {
      return era['raw']().global['saves'][89];
    },
    /**
     * 存档89
     * @param {string} v
     */
    set 89(v) {
      era['raw']().global['saves'][89] = v;
    },
    /**
     * 存档90
     * @returns {string}
     */
    get 90() {
      return era['raw']().global['saves'][90];
    },
    /**
     * 存档90
     * @param {string} v
     */
    set 90(v) {
      era['raw']().global['saves'][90] = v;
    },
    /**
     * 存档91
     * @returns {string}
     */
    get 91() {
      return era['raw']().global['saves'][91];
    },
    /**
     * 存档91
     * @param {string} v
     */
    set 91(v) {
      era['raw']().global['saves'][91] = v;
    },
    /**
     * 存档92
     * @returns {string}
     */
    get 92() {
      return era['raw']().global['saves'][92];
    },
    /**
     * 存档92
     * @param {string} v
     */
    set 92(v) {
      era['raw']().global['saves'][92] = v;
    },
    /**
     * 存档93
     * @returns {string}
     */
    get 93() {
      return era['raw']().global['saves'][93];
    },
    /**
     * 存档93
     * @param {string} v
     */
    set 93(v) {
      era['raw']().global['saves'][93] = v;
    },
    /**
     * 存档94
     * @returns {string}
     */
    get 94() {
      return era['raw']().global['saves'][94];
    },
    /**
     * 存档94
     * @param {string} v
     */
    set 94(v) {
      era['raw']().global['saves'][94] = v;
    },
    /**
     * 存档95
     * @returns {string}
     */
    get 95() {
      return era['raw']().global['saves'][95];
    },
    /**
     * 存档95
     * @param {string} v
     */
    set 95(v) {
      era['raw']().global['saves'][95] = v;
    },
    /**
     * 存档96
     * @returns {string}
     */
    get 96() {
      return era['raw']().global['saves'][96];
    },
    /**
     * 存档96
     * @param {string} v
     */
    set 96(v) {
      era['raw']().global['saves'][96] = v;
    },
    /**
     * 存档97
     * @returns {string}
     */
    get 97() {
      return era['raw']().global['saves'][97];
    },
    /**
     * 存档97
     * @param {string} v
     */
    set 97(v) {
      era['raw']().global['saves'][97] = v;
    },
    /**
     * 存档98
     * @returns {string}
     */
    get 98() {
      return era['raw']().global['saves'][98];
    },
    /**
     * 存档98
     * @param {string} v
     */
    set 98(v) {
      era['raw']().global['saves'][98] = v;
    },
    /**
     * 存档99
     * @returns {string}
     */
    get 99() {
      return era['raw']().global['saves'][99];
    },
    /**
     * 存档99
     * @param {string} v
     */
    set 99(v) {
      era['raw']().global['saves'][99] = v;
    },
  },
};

module.exports = era_info;
// GENERATED END