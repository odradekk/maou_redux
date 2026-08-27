---
title: '#2 开发环境配置'
---

编程的本质是使用编程语言编写文本文件，理论上任何可以用于处理文字的软件都可以用于开发，例如记事本、Microsoft Word、手机备忘录甚至即时通讯工具。但编程语言具有形式化要求，开发过程中总要处理保留关键词、变量和函数引用之类需要保证精确输入的场合，此时就需要集成开发环境（Integrated Development Environment，IDE）的介入。

# Lackbfun大佬推荐的开发环境

## Sublime Text

Sublime Text是一款轻量的文本编辑器，启动速度和内存占用在本页推荐的三款开发环境中是最佳的。但成也轻量败也轻量，Sublime Text缺少很多开发需要的便捷功能，所以笔者一般用于日常文字编辑工作、简单的代码编辑和阅读工作、以及记事本等。

Sublime Text不需要安装任何插件就可以为ere游戏的开发提供代码关键词高亮、输入联想和自动补全等功能，当然也可以安装eslint（一种代码风格化、也就是自动排版工具，具体用法在 [下文](#进阶使用eslint管理代码质量) 有详细指引）、Pretty JSON等插件辅助开发。

> （摘自 [零基础开发 era 游戏 #3 开发环境配置](https://lackbfun.pages.dev/era/era-diy-tutorial-3-editor/#sublime-text)）Sublime Text的插件安装办法：
>   1. Ctrl + Shift + P 打开命令面板。
>   2. 输入 Install Package Control 后 Enter 安装包管理器「Package Control」。
>   3. 安装完成后 Ctrl + Shift + P 打开命令面板。
>   4. 输入 install 选择 Package Control: Install Package。
>   5. Enter 进入「安装包输入界面」。
>   6. 继续输入想安装的插件名安装相关插件（可以只输入关键词以自动联想和搜索）。

Sublime Text是一款收费应用，但只需要忍耐偶尔冒出的请求购买窗口就可以无限续杯使用。

[下载地址](https://www.sublimetext.com/download)

## Visual Studio Code

VS Code是一款综合性的集成开发环境，相较Sublime Text更重，但更适合开发。基于插件商店中强大的插件，VS Code可以用于多种语言、环境、框架的开发。

同样的，VS Code不需要安装任何插件就可以为ere游戏的开发提供代码关键词高亮、输入联想和自动补全等功能，也可以通过安装相关插件辅助开发。VS Code的插件商店可以通过快捷键 Ctrl + Shift + X 或「扩展」侧边栏进入。

VS Code是免费的。

[下载地址](https://code.visualstudio.com/download)

# ere游戏推荐的开发环境：Webstorm

Webstorm是Jetbrains公司开发的、主要面向JavaScript和Typescript及相关语言和框架的集成开发环境。Webstorm原来是付费工具，在2024年10月24日向个人开发者免费开放。Webstorm可以直接 [从这里下载](https://www.jetbrains.com/zh-cn/webstorm/download/)，也可以先 [安装Jetbrains Toolbox](https://www.jetbrains.com/zh-cn/toolbox-app/) 后从工具中下载，以便于管理所有Jetbrains旗下的开发工具并更新。

![Webstorm界面](../imgs/2-Webstorm.png)

## 基础配置

使用Webstorm开发时，为让Webstorm正确理解路径，需要在ere文件夹中创建jsconfig.json，然后输入以下内容：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "#/*": [
        "*"
      ]
    }
  }
}
```

这会让Webstorm将文件路径中的#号理解为ere文件夹，例如会将`#/era-electron.js`理解为ere文件夹下的era-electron.js文件，`#/event/rec/rec-factory.js`会理解为ere文件夹/event/rec/rec-factory.js文件。

Webstorm也拥有丰富的插件支持，可以在【设置】-【插件】中安装和管理，建议安装以下插件：

* Rainbow Brackets Lite - Free and OpenSource：这个插件会把括号、中括号、大括号成对上色，成对的括号将拥有相同的颜色、不成对的括号将拥有不同的颜色，对阅读括号较多的代码很有帮助。
* CodeGlance Pro：这个插件会在打开文件后在右侧显示文件的缩略图。

安装Webstorm并打开项目（[#1 基本知识](./01-basic#一切的开始新建项目) 中创建的游戏文件夹）后，打开main.js，其中module.exports可能会出现波浪下划线，此时鼠标移过去会显示悬浮窗，选择其中的启用Node.js辅助功能（或者意思相近的选项，如你所见笔者使用的是英语IDE），就可以让波浪下划线和相关的错误提示消失了。

## 一些小Tips

Ctrl + F 可以在当前文件搜索，Ctrl + R 可以在当前文件替换；<br>
Ctrl + Shift + F 可以在所有文件中搜索，Ctrl + Shift + R 可以在所有文件中替换。

## （进阶）使用eslint管理代码质量

eslint 是一款代码风格化工具，可以对代码进行排版和简单的错误排查。与Webstorm配合使用，可以自动将你刚写出的新鲜的、毫无格式、可读性极差的一坨排版成规范、有美感、可读性良好的……一坨（笑）。

eslint 需要通过 npm 安装。Node.js 和 npm 相关的内容主要在 [#18 其他辅助开发工具](./18-tools#nodejs) 中介绍，这里只提供最少步骤就可以启用 eslint 的方法。

1. 【设置】-【语言和框架】-【Node.js】，这里理论上应该是空的；
2. 点击上方Node解释器的下拉框，选择【下载】；
3. 在第一个选项框中选择【Node.js 18】，然后点击【下载】；
4. 下载完成后，在解释器的下拉框选择刚刚下载的Node.js 18；
5. 下方的包管理器下拉框选择npm（这个选项是默认的，如果已经显示为npm就不用管）。
6. 在游戏文件夹下创建package.json文件，然后输入如下内容：
  ```json
  {
    "devDependencies": {
      "eslint": "^8.57.1",
      "eslint-config-prettier": "^9.1.0",
      "eslint-plugin-prettier": "^5.2.1",
      "eslint-plugin-require-sort": "^1.3.0",
      "eslint-plugin-sort-requires-by-path": "^1.0.2",
      "prettier": "^3.4.2"
    },
    "engines": {
      "node": ">=18"
    }
  }
  ```
7. 在Webstorm中左侧文件管理器中选中package.json，右键，选择【npm install】；
8. 在游戏文件夹下创建.eslintrc.js文件，然后输入如下内容：
  ```JavaScript
  module.exports = {
    env: {
      node: true,
      es6: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
      ecmaVersion: 'latest',
    },
    root: true,
    rules: {
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
    },
  };
  ```
9. 打开Webstorm的【设置】-【语言与框架】-【JavaScript】-【代码质量工具】-【ESLint】，选中【自动ESLint设置】和【在保存时运行eslint --fix】两项。

完成上述几步之后，就可以随意在代码上泼洒墨水了，Webstorm会在保存文件或者切换文件触发自动保存的时候进行自动排版（除非写得完全不对给eslint都整不会了）。