---
title: '#11 存档文件'
---

本章主要介绍ere游戏中的通用公共存档文件、专属的特定存档文件及其相关的 API 和游戏配置。这些文件会被保存在游戏文件夹下的sav文件夹中。

因为涉及到文件I/O，本章介绍的所有 API 都是**异步函数**，使用时必须用 async 关键词转同步。这些 API 的返回值统一为 Boolean 类型，表示操作是否成功。

# 通用公共存档文件 global.sav

## 概览

通用公共存档文件 global.sav 不专属于任何特定存档，在读取游戏脚本后自动加载（如果不存在会自动创建）。在任何特定存档下，读取 global 表（通用公共存档的主体部分）中的变量将总是能得到相同的结果。

global.sav 是一个 JSON 格式的文件，其数据结构主要由 Global.csv（或其他后缀名）决定，同时还有 code、saves 和 version 等属性。[第一章创建的游戏项目](./01-basic#一切的开始新建项目) 用 JavaScript 的对象表现如下：

```javascript
{
  // Global.csv 中定义的 global 表的变量序号与变量值
  // ...
  // 游戏标识
  code: 114514,
  saves: {
    // 特定存档文件的备注
    // ...
  },
  // 当前游戏版本
  version: 1
}
```

saves 对象属性中的属性名是特定存档的栏位号，属性值则是特定存档的备注信息，会在存或删特定存档时增删。

因为通用公共存档会伴随专属存档的保存而保存，多数情况下不需要手动调用读写公共存档的 API，专注特定的存档内容即可。

## era.saveGlobal：保存公共存档

![era.saveGlobal](../imgs/68-era.saveGlobal.png)

主要用于手动保存 global.sav 的 API，在 global 表的基础上设置 code 和 version 属性，然后转换为 JSON 格式写入到 sav 文件夹下的 global.sav 文件中。

在引擎内部，era.saveGlobal 还会在以下情况下自动调用：

* era.loadGlobal 的最后；
* era.resetGlobal 重置通用公共存档后；
* era.saveData 保存特定存档后；
* era.rmData 删除特定存档后。

## era.loadGlobal：读取公共存档

![era.loadGlobal](../imgs/69-era.loadGlobal.png)

主要用于手动读取 global.sav 的 API，读取时会进行以下操作：

* 检查 global.sav 中的 code 属性是否与游戏标识相同，如果不同会拒绝读取、弹出报错信息并停止后续操作；
* 检查 global.sav 中的 version 属性是否高于游戏最低支持版本，如果为否会弹出报错信息并调用 era.resetGlobal 重置 global.sav 的内容，这会丢弃其中的所有内容；
* 读取 global.sav 保存到 global 表中，对其中所有未初始化的变量赋0；
* 扫描sav文件夹，按照游戏配置中的存档文件数检查每个栏位的存档，如果有存档备注但已丢失则在前面加上 `(FILE LOST) `，如果有存档但相应栏位无备注则命名为 `UNNAMED SAVE FILE`，如果有存档但相应栏位备注有 `(FILE LOST) ` 则清除该段文字；
* 调用 era.saveGlobal 保存 global.sav。

era.loadGlobal 会在每次开始执行游戏脚本前自动执行一次。

## era.resetGlobal：重置公共存档

![era.resetGlobal](../imgs/70-era.resetGlobal.png)

主要用于手动重置公共存档的 API，这会丢弃所有已有内容，重置 code 和 version 属性为游戏信息中的当前值，对 global 表中的所有内容赋0。era.resetGlobal 最后也会像 [era.loadGlobal](#eraloadglobal读取公共存档) 一样扫描sav文件夹，然后调用 era.saveGlobal 保存 global.sav。

# 专属的特定存档 save*.sav

## 概览

专属的特定存档 save*.sav 主要用于保存 global 表之外的其他数据表。特定存档必须通过 API 读写。

特定存档由栏位号区分，即 save*.sav 中 * 的部分，通常是一个自然数。一般以 save0.sav 作为自动存档栏位，其他存档作为手动存档栏位。

特定存档在读写时栏位号可以是任意自然数，游戏配置中的[【存档数量】](./03-config#systemsavefiles存档数量) 只影响引擎 era.loadGlobal 和 era.resetGlobal 时扫描sav文件夹中的文件数量。如果一个存档的栏位号大于【存档数量】，它的存在情况不会被自动扫描，备注也不会自动修改。

## era.saveData：保存特定存档

![era.saveData](../imgs/71-era.saveData.png)

主要用于保存特定存档的 API，有两个参数：savIndex 参数是 Number 类型，接受一个自然数；comment 是字符串类型，作为该栏位存档的备注。era.saveData 在保存前会将当前的游戏标识和版本号赋值给存档中的 code 和 version 属性。

era.saveData 会按照游戏配置中的[【存档文件格式】](./03-config#systemsavecompresseddata是否压缩保存游戏存档) 决定是否压缩保存，若是的话会将游戏存档以 gzip 压缩后再保存，否则直接转换为 JSON 格式保存。在写入文件后，era.saveData 修改 global 表中相应存档栏位的备注，然后调用 era.saveGlobal。可以通过检查相应栏位的备注确定该存档是否存在。

> 安卓版引擎会跳过游戏配置检查直接以 JSON 格式保存。

## era.loadData：读取特定存档

![era.loadData](../imgs/72-era.loadData.png)

用于读取特定存档的 API，只接受 Number 类型的参数 savIndex。EraElectron引擎会自动尝试以 JSON 格式或压缩文件形式读取存档，然后从成功的读取中获取存档数据。era.loadData 会进行和 [era.loadGlobal](#eraloadglobal读取公共存档) 类似的检查，仅在游戏标识符合、版本高于最低支持版本时进行后续操作，否则会停止并返回 false。然后 era.loadData 会为 Item.csv 中新增的道具设置 item 表、创建所有存档中不存在的数据表、为新增系统变量表的所有变量赋0、为所有角色在新增角色变量表中创建子表并初始化所有变量（cstr表中的变量会赋空字符串`''`，其他角色变量表中的变量赋0）。

## era.rmData：删除特定存档

![era.rmData](../imgs/73-era.rmData.png)

用于删除特定文档的 API，只接受 Number 类型的参数 savIndex，删除相应栏位的存档后删除 global.sav 中的存档备注，并调用 era.saveGlobal 保存。

此外，[控制台对象 era 的函数 cleanSave](./07-debug#eracleansave) 是通过调用 era.rmData 实现的。

## era.resetData：重置特定存档

![era.resetData](../imgs/74-era.resetData.png)

用于重置当前已读取的存档为初始状态的 API，一般用于开始新游戏时。因为不涉及实际的文件操作，该 API 是本章介绍的 API 中唯一一个非异步的、无返回值的函数。在 GameBase.csv 中设置【初始角色编号】时，era.resetData 在重置所有数据表并初始化变量后会自动调用 era.addCharacter 添加初始角色。

# 小结

本章介绍了保存在sav文件夹下的两种类型的存档文件及其相关的 API。公共通用存档 global.sav 保存了 global 表和各特定存档的备注，在每次开始执行游戏脚本前加载或初始化（如果 global.sav 不存在）并扫描特定存档。公共通用存档会伴随特定存档的保存而保存，因此多数情况下可以忽略它而关注特定存档的内容。特定存档 save*.sav 保存了其他的数据表，需要手动调用 API 进行读写。API 会自动增删存档对应的备注信息，因此可以通过备注信息检查存档是否存在。存档相关的 API 除了 era.resetData 外都是异步函数，需要用 async 转同步处理，Boolean 类型的返回值表示该操作是否成功；era.resetData 则是无任何参数或返回值的非异步函数。