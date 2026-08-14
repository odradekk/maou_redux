---
title: '#20 检查版本更新'
---

本章介绍如何为游戏启用版本更新检查功能和EraElectron引擎支持的最小更新功能，以及如何通过代码仓库的标签（Tag）自动构建游戏版本（包括安卓游戏包）并发布。

本章利用了代码仓库托管平台的 CI（Continuous Integration，持续集成） 和 Pages 功能，各代码仓库托管平台的类似功能略有差别，这里只介绍 EraElectron、ere.app 等项目的托管平台 gitgud.io 及技术提供商 GitLab 的 CI 与 Pages 设置。

本章中的静态文件均为 CSV 格式。本章中的所有文件均可以在 [例程](https://gitgud.io/umaera/game/ere-example) 中找到最终版本。

因为使用了 Node.js 运行环境和 npm 包管理器，在阅读本章之前需要阅读 [#18 其他辅助开发工具](./18-tools#nodejs) 中的相关内容。[涉及安卓游戏包的部分](#自动构建安卓游戏包) 请在阅读 [#19 生成Android版](./19-android#打包工具) 之后阅读。

# 前置知识

## git

> Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。[^1]

[^1]: [Git 教程 | 菜鸟教程](https://www.runoob.com/git/git-tutorial.html)

Git 的具体用法可以查阅 lackbfun 大佬的教程：[有手就行的 Git 使用方法 | lackbfun's blog](https://lackbfun.pages.dev/devops/git-usage/)。

如果读者配置了 IDE，VSCode 或 WebStorm 都与 Git 有丝滑的集成，Sublime Text 则需要额外下载 Sublime Merge 进行项目管理（二者可以相互打开）。建议读者熟悉所用的 IDE 集成的 Git 版本控制，而非 Git 的命令行用法，这样会更加快捷。

## gitgud.io 与 GitLab

> Gitgud.io 是一个由 Sapphire 运营，基于 GitLab 的免费 Git 托管网站。[^2]<br>
> GitLab 是一个基于 Git 的开源仓库管理系统和功能强大的 DevSecOps 平台。[^3]

[^2]: [gitgud.io](https://gitgud.io)

[^3]: [GitLab](https://gitlab.com)

## GitLab CI

> 考虑一个应用程序，它的代码存储在极狐 GitLab 的 Git 存储库中。开发人员每天多次推送代码更改。对于每次推送到仓库，您可以创建一组脚本来自动构建和测试您的应用程序。这些脚本有助于减少您在应用程序中引入错误的机会。<br>
> 这种做法称为持续集成。提交给应用程序的每个更改，甚至是开发分支，都会自动且连续地构建和测试。这些测试可确保更改通过您为应用程序建立的所有测试、指南和代码合规性标准。[^4]

[^4]: [CI/CD 概念 | 极狐GitLab](https://gitlab.cn/docs/jh/ci/introduction/#持续集成)

本章介绍的所有功能都会实现为在 GitLab CI 中运行的脚本，然后在仓库的特定动作触发之后自动执行。要运行 GitLab CI 的脚本，需要先在计算机上 [安装 GitLab Runner](https://gitlab.cn/docs/runner/install/windows.html)，并 [注册](https://gitlab.cn/docs/runner/register/#使用-runner-认证令牌注册) 在读者在托管平台上创建的代码仓库中。

> 注册 Runner 时会要求选择 Runner 的类型，下文中大部分功能需要的都是 shell 类型的 Runner，仅有 [发布](#进阶发布releases) 一节需要用到 docker 类型的 Runner，这需要读者 [安装好 docker 环境](https://www.runoob.com/docker/windows-docker-install.html)。建议相应类型的 Runner 在注册时赋予与类型同名的 标签/Tags。<br>
> 后文中的脚本都指定了执行脚本任务的 Runner 类型，如果没有在设置时加标签记得将 .gitlab-ci.yml 中的 tags 字段删去（从 `tags:` 开始删，删到 `script:` 之前）

**本章之后的所有内容都基于通过在代码仓库中创建标签触发的持续集成过程，标签名一定是当前提交下 GameBase.csv/json/yml 和 build/static.json 中的游戏版本号除以 1,000 的结果（例如版本号为 1，则标签名是 0.001；特别的，如果版本号能整除 1,000，会在除以 1,000 后补小数，也就是 1,000 的版本号对应的标签名是 1.0）。**

笔者使用的是 Mac 开发环境，可能与读者使用的不同。因此，本章中所有脚本将尽可能使用 Node.js 编写，请读者准备好 Node.js 运行环境，并在游戏项目文件夹下运行以下指令：

```shell
# 以下安装的软件包均用于压缩文件
npm install -D 7zip-bin archiver archiver-zip-encrypted compressing fs-extra
# 如果使用的是 YAML 格式的静态数据文件，额外安装 yamljs
npm install yamljs
```

**在触发 GitLab CI 脚本前，请确认相关的 Runner 处于运行状态！**

# 更新检查

更新检查服务主要用到了托管平台的 Pages 功能，基于 GitLab CI 自动部署一个公开的网站，然后引擎就可以通过访问它来获取最新的游戏版本号并根据最新版本弹出更新提示。

另外游戏的更新检查可以通过 PC 引擎菜单栏的【游戏】-【启动时检查游戏更新】选项控制。

## 构建更新检查服务

在游戏项目文件夹下创建以下文件：

```javascript
// ci/pages.js
const { mkdirSync, readFileSync, rmSync, writeFileSync } = require('fs');

rmSync('public', { force: true, recursive: true });
mkdirSync('public');

// 版本号从 csv/GameBase.csv 里读取
// 如果是其他格式的可以自行修改
// json 可以直接 require，yml 需要装一个 yamljs 处理
const game_version = readFileSync('csv/GameBase.csv', 'utf-8')
  .replace(/^\uFEFF/, '')
  .split('\n')
  .find((e) => e.startsWith('版本,'))
  .substring(3)
  .replace(/\s+$/, '');

// 生成版本检查用的文件
writeFileSync('public/RELEASE', game_version);
```

```yaml
# .gitlab-ci.yml
workflow:
  rules:
    - if: $CI_COMMIT_TAG

# 通过 Pages 功能构建版本检查服务
pages:
  stage: deploy
  tags:
    - shell
  script:
    - node ci/pages.js
  artifacts:
    paths:
      - public
```

.gitlab-ci.yml 文件位于游戏文件夹下，它的作用是当开发者创建了一个标签并推送到托管平台后，托管平台会自动触发 shell 类型的 Runner，然后运行 ci/pages.js。pages.js 会创建一个 public 文件夹，在其中生成一个含有当前游戏版本号的 RELEASE 文件，并上传到托管平台上创建静态网站。

在创建标签并执行完脚本之后，可以在托管在 gitgud.io 或 GitLab 的仓库中检查部署情况（侧边栏【部署/Deploy】-【Pages】），然后可以看到刚刚创建好的静态网站地址。现在这个网址下只有一个 RELEASE 文件是有效的，可以在网址后加 `'/RELEASE'` 尝试访问。例如 EraUma 的静态网站地址是 `https://umaera.gitgud.site/erauma`，则可以访问 `https://umaera.gitgud.site/erauma/RELEASE`。

> 注意检查【部署/Deploy】-【Pages】界面中的【使用唯一域名/Use unique domain】选项，一般不需要开启这个选项，可以关掉，然后刚刚部署的页面将会有一个相对正常的网址。

## 配置更新检查

构建好更新检查服务之后，只需要在 GameBase.csv 中增加一个变量就可以了（假设静态网站的地址是 `https://umaera.gitgud.site/game/ere-example`）：

```csv
; GameBase.csv
; ...
; 注意发布页变量是必须的
发布页,https://gitgud.io/umaera/game/ere-example
版本检查,https://umaera.gitgud.site/game/ere-example/RELEASE
```

现在可以将 GameBase.csv 中的版本号尝试改小一点，在引擎中重载游戏并进入后就可以看到更新提示了。下图是 ereKanon 中更新检查提示的效果：

![更新检查](../imgs/106-更新检查.png)

> 因为同时满足最小更新的版本要求，所以这个更新检查提示是有最小更新的提示的。

# 最小更新

最小更新是指通过引擎只下载运行游戏所需的最低限度的游戏包（静态数据文件夹和脚本文件夹），玩家可以通过它进行无感知的后台更新，在此过程中仍然可以进行游戏，直到引擎弹出提示框后重载游戏就可以完成游戏更新。

最小更新支持对版本号进行限制。在某些情况下，开发者希望玩家重新下载整个游戏包而非仅是可运行游戏所需的最低限度的文件，例如同时还有多媒体资源文件更新等。此时可以在玩家的游戏版本高于某个版本号时才允许最小更新。

## 构建最小更新服务

最小更新服务分为两部分，一部分是在更新检查文件（静态网站中的 RELEASE 文件）中添加一行用于最小更新版本检查的版本号，另一部分则是在 GitLab CI 中构建最小更新包。最小更新要求的最低版本号规则和 GameBase.csv 中的版本号相同，可单独写在游戏项目文件夹下的 .ere-min-version 文本文件中。为构建最小更新服务，需要创建或修改以下文件：

```javascript
// ci/build.js
const { execSync } = require('child_process');
const { createWriteStream, readFileSync, rmSync } = require('fs');
const { join, resolve } = require('path');

const { zip } = require('compressing');

const work_dir = resolve('.');

// 检查是否要生成最小更新用的基础包
// 如果当前版本和最小更新的最低支持版本相同就不生成，因为用不到
const min_version = readFileSync(join(work_dir, '.ere-min-version'), 'utf-8')
  .replace(/^\uFEFF/, '')
  .split('\n')[0]
  .replace(/\s+$/, '');
const game_version = readFileSync(join(work_dir, 'csv/GameBase.csv'), 'utf-8')
  .replace(/^\uFEFF/, '')
  .split('\n')
  .find((e) => e.startsWith('版本,'))
  .substring(3)
  .replace(/\s+$/, '');
if (min_version !== game_version) {
  const base_zip = join(work_dir, 'base.zip');
  rmSync(base_zip, { force: true });
  const zip_stream = new zip.Stream();
  // 基础包里只需要一个静态数据文件夹（这里是csv）和游戏脚本集（ere）
  zip_stream.addEntry(join(work_dir, 'csv'));
  zip_stream.addEntry(join(work_dir, 'ere'));
  const write_stream = createWriteStream(base_zip);
  zip_stream.pipe(write_stream);
  write_stream.on('finish', () =>
    // 基础包生成后上传
    execSync(
      `curl --fail-with-body --header "JOB-TOKEN: ${process.env.CI_JOB_TOKEN}" --upload-file ${base_zip} "${process.env.BASE_URL}"`,
    ),
  );
}
```

```javascript
const { mkdirSync, readFileSync, rmSync, writeFileSync } = require('fs');

rmSync('public', { force: true, recursive: true });
mkdirSync('public');

const min_version = readFileSync('.ere-min-version', 'utf-8')
  .replace(/^\uFEFF/, '')
  .split('\n')[0]
  .replace(/\s+$/, '');
// 版本号从 csv/GameBase.csv 里读取
// 如果是其他格式的可以自行修改
// json 可以直接 require，yml 需要装一个 yamljs 处理
const game_version = readFileSync('csv/GameBase.csv', 'utf-8')
  .replace(/^\uFEFF/, '')
  .split('\n')
  .find((e) => e.startsWith('版本,'))
  .substring(3)
  .replace(/\s+$/, '');

// 生成版本检查用的文件
writeFileSync('public/RELEASE', `${game_version}\n${min_version}`);
```

```yaml
# .gitlab-ci.yml
workflow:
  rules:
    - if: $CI_COMMIT_TAG

variables:
  BASE_URL: '${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/base/${CI_COMMIT_TAG}/base.zip'

build:
  stage: build
  tags:
    - shell
  script:
    - npm install
    - node ci/build.js
# ...
# 通过 Pages 功能构建版本检查服务
# ...
```

注意游戏项目文件夹根目录下必须有 .ere-min-version 文件，且 .gitlab-ci.yml 中 build 必须写在 pages 之前。

在创建标签之后，Runner 按照 .gitlab-ci.yml 首先运行了 ci/build.js，在其中检查当前版本是否与最小更新的最低支持版本相同，如果相同，说明开发者希望玩家在该版本下重新下载整个游戏包而非最小更新包，则不会生成新的最小更新包；否则，将 csv 和 ere 两个文件夹压缩到同一个 base.zip 文件中，并上传到托管平台中该仓库的【软件包库/Package registry】（也在【部署/Deploy】下）中。然后，Runner 会运行 ci/pages.js，将当前版本号和最小更新的最低支持版本号分两行写入 public/RELEASE 并上传到托管平台。这样就完成了最小更新服务的构建。

.gitlab-ci.yml 中 BASE_URL 变量即是最小更新包的下载地址。如果读者使用的是 gitgud.io，这个地址会是`` `https://gitgud.io/api/v4/projects/${游戏仓库的ID}/packages/generic/base/${标签名}/base.zip` ``，游戏仓库的ID可以在托管平台上代码仓库中【设置/Settings】-【通用/General】找到，在设置项目名称的输入框的右边，被禁用的输入框中就是游戏仓库的ID。

## 配置最小更新

为游戏启用最小更新也只需要在 GameBase.csv 中增加一个变量（假设最小更新包的下载地址是 `` `https://gitgud.io/api/v4/projects/30352/packages/generic/base/${标签名}/base.zip` ``）：

```csv
; GameBase.csv
; ...
程序更新,https://gitgud.io/api/v4/projects/30352/packages/generic/base/${VERSION}/base.zip
```

引擎会自动将程序更新地址中的 `${VERSION}` 替换为从更新检查服务中得到的最新版本号。

引擎中对最小更新的提示如前图所示，提示框中第一个可点击的超链接会打开游戏的发布网页，点击第二个超链接就会在后台自动开始下载最小更新包并替换本地文件，玩家只需要在引擎提示下载完成后重载游戏即可。

# （进阶）发布（Releases）

在 gitgud.io 等托管平台中，发布（Releases）在标签（Tags）的基础上创建了当前游戏版本的快照，同时可以附上游戏的安装包、更新日志和发布说明等。[^5]

[^5]: [发布 | 极狐GitLab](https://gitlab.cn/docs/jh/user/project/releases/)

发布的主要作用是将游戏的发行版本及各版本的关键信息与数据集中起来，便于玩家查阅和下载。在 gitgud.io 中，在游戏项目的网址后加 `/-/releases` 就可以打开该游戏项目的发布页面，`/-/releases/permalink/latest` 则会打开游戏项目最新的发布版本页面。发布页面（`/-/releases`）可以作为 GameBase.csv 中的发布页变量。

> 假设游戏项目的网址是 `https://gitgud.io/umaera/game/ere-example`，则发布页面的网址是 `https://gitgud.io/umaera/game/ere-example/-/releases`，最新版本是 `https://gitgud.io/umaera/game/ere-example/-/releases/permalink/latest`。

发布可以通过 GitLab CI 创建，本节将介绍如何通过 GitLab CI 自动构建游戏包（包括安卓游戏包）并在 gitgud.io/GitLab 中创建发布。创建发布需要 docker 类型的 GitLab Runner，读者需要安装 docker 运行环境、创建一个 docker 类型的 Runner 并注册。

## 自动构建游戏版本并发布

修改以下文件：

```javascript
// ci/build.js
const { copySync } = require('fs-extra');

const work_dir = resolve('.'),
  game_dir = join(work_dir, process.env.GAME_DIR),
  game_zip = join(work_dir, process.env.GAME_ZIP);

// 生成PC游戏包并上传
rmSync(game_dir, { recursive: true, force: true });
mkdirSync(game_dir);
// PC游戏包只有 ere 和 csv 两个文件夹，可以把 csv 换成 json 或 yml
['ere', 'csv'].forEach((d) => copySync(join(work_dir, d), join(game_dir, d)));
rmSync(game_zip, { force: true });
switch (os.platform()) {
  case 'linux':
  case 'darwin':
    execSync(`chmod +x ${path7za}`);
    break;
  case 'win32':
}
execSync(`${path7za} a -pera ${game_zip} ${game_dir}`);
execSync(
  `curl --fail-with-body --header "JOB-TOKEN: ${process.env.CI_JOB_TOKEN}" --upload-file ${game_zip} "${process.env.GAME_URL}"`,
);
// 创建最小更新包
// ...
```

```yaml
# .gitlab-ci.yml
workflow:
  rules:
    - if: $CI_COMMIT_TAG

variables:
  GAME_DIR: '【你的游戏名】-${CI_COMMIT_TAG}'
  GAME_ZIP: '【你的游戏名】-${CI_COMMIT_TAG}.7z'
  GAME_URL: '${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/【你的游戏名】/${CI_COMMIT_TAG}/${GAME_ZIP}'
  BASE_URL: '${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/base/${CI_COMMIT_TAG}/base.zip'

# 生成用于分发的游戏包并上传，包括用于最小更新功能的基础包
build:
  stage: build
  tags:
    - shell
  script:
    - npm install
    - node ci/build.js

# ...
# 通过 Pages 功能构建版本检查服务
# ...

# 顺手发一个 Release（发布），便于在仓库中找到
release:
  stage: deploy
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  needs:
    - job: build
  tags:
    - docker
  script:
    - echo Releasing...
  release:
    name: 【你的游戏名】 v$CI_COMMIT_TAG
    description: '【随便写点什么】'
    tag_name: $CI_COMMIT_TAG
    ref: $CI_COMMIT_SHA
    assets:
      links:
        - name: '[PC游戏包] $GAME_ZIP (解压密码：era)'
          url: '${GAME_URL}'
          link_type: package
```

> 记得修改 .gitlab-ci.yml 里用 `【】` 包起来的内容

上面的代码会按照在 .gitlab-ci.yml 开头对文件夹名和压缩包名的设置自动创建一个以era为解压密码的压缩包并上传到【软件包库/Package registry】，然后在托管平台的游戏项目仓库中创建了一个发布，其中带有在 .gitlab-ci.yml 中写好的信息，以及压缩包的地址。

## 自动构建安卓游戏包

> 在阅读本节之前，请确定阅读过 [#19 生成Android版](./19-android#打包工具)！

构建并上传安卓游戏包只需要在 build/build.js 的基础上稍作变形即可。和PC版游戏包相同，安卓版游戏包的压缩包名与上传地址也通过 .gitlab-ci.yml 开头的变量指定。创建或修改以下文件：

```javascript
// ci/android.js
const { execSync } = require('child_process');
const {
  createWriteStream,
  existsSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} = require('fs');
const { resolve } = require('path');

const archiver = require('archiver');
const webpack = require('webpack');
archiver.registerFormat('zip-encrypted', require('archiver-zip-encrypted'));

const config = require('../webpack.config');

if (!existsSync('./build/static.json')) {
  console.error('Build failed: no static.json!');
  process.exit(1);
}

const staticData = require('../build/static.json');

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('Build failed:', err || stats.toJson().errors);
  } else {
    console.log(
      'Build succeeded:',
      stats.toString({
        chunks: false,
        colors: true,
      }),
    );
    const mainPath = resolve('./dist/main.bundle.js');
    writeFileSync(
      mainPath,
      readFileSync(mainPath, 'utf-8').replace(/\w\("La5K"\)/g, '_era'),
    );
    writeFileSync(resolve('./dist/static.json'), JSON.stringify(staticData));
    // 将打包后的脚本压缩成 zip 文件然后上传
    // zip 格式基本上被大部分手机支持
    const game_dir = resolve(process.env.GAME_DIR),
      bundle_zip = resolve(process.env.GAME_BUNDLE_ZIP);
    rmSync(game_dir, {  force: true, recursive: true });
    renameSync('./dist', game_dir);
    rmSync(bundle_zip, { force: true });
    const zip_file = archiver('zip-encrypted', {
      encryptionMethod: 'aes256',
      password: 'era',
      zlib: { level: 9 },
    });
    const out_stream = createWriteStream(bundle_zip);
    zip_file.pipe(out_stream);
    zip_file.directory(game_dir, process.env.GAME_DIR);
    out_stream.on('finish', () =>
      // 安卓游戏包生成后上传
      execSync(
        `curl --fail-with-body --header "JOB-TOKEN: ${process.env.CI_JOB_TOKEN}" --upload-file ${bundle_zip} "${process.env.GAME_BUNDLE_URL}"`,
      ),
    );
    zip_file.finalize().then();
  }
});
```

```yaml
# .gitlab-ci.yml
# ...
variables:
  # ...
  GAME_BUNDLE_ZIP: '【你的游戏名】-bundle-${CI_COMMIT_TAG}.zip'
  GAME_BUNDLE_URL: '${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/bundle/${CI_COMMIT_TAG}/【你的游戏名】-bundle-${CI_COMMIT_TAG}.zip'
# ...
# 生成用于分发的游戏包并上传，包括用于最小更新功能的基础包
# build:
# ...
# 生成安卓版用的游戏包并上传
android:
  stage: build
  tags:
    - shell
  script:
    - npm install
    - node ci/android.js
# ...
# 通过 Pages 功能构建版本检查服务
# pages:
# ...
# 顺手发一个 Release（发布），便于在仓库中找到
release:
  stage: deploy
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  needs:
    - job: build
  tags:
    - docker
  script:
    - echo Releasing...
  release:
    name: 【你的游戏名】 v$CI_COMMIT_TAG
    description: '【随便写点什么】'
    tag_name: $CI_COMMIT_TAG
    ref: $CI_COMMIT_SHA
    assets:
      links:
        - name: '[PC游戏包] $GAME_ZIP (解压密码：era)'
          url: '${GAME_URL}'
          link_type: package
        - name: '[安卓游戏包] $GAME_BUNDLE_ZIP (解压密码：era)'
          url: '${GAME_BUNDLE_URL}'
          link_type: package
```

上面的代码会在构建安卓版游戏包之后打包成解压密码为era的 zip 文件，然后上传到【软件包库/Package registry】，并在发布信息中附上下载链接。

# 小结

本章以 gitgud.io/GitLab 和 GitLab CI 为例，介绍了如何使用代码托管平台的 CI 功能在开发者创建标签标记游戏新版本后自动构建版本检查和最小更新服务并创建发布。在构建在线服务后，就可以通过在 GameBase.csv 中增加相应变量启用这些功能。

本章较为困难的部分可能在安装 Git、在代码托管平台创建线上仓库并配置 Runner。在完成这些步骤后，如果读者的游戏项目相关配置和笔者的示例相同（比如 CSV 格式的静态数据文件、GameBase.csv 中版本号以 `版本` 为变量名等），本章创建的大部分脚本和代码都可以直接取用，仅需要修改 GameBase.csv 中的相关网址和 .gitlab-ci.yml 的相关位置即可（开头的 variables、发布中的 description）。读者可以在 [例程](https://gitgud.io/umaera/game/ere-example) 中找到完整的例子，或者在 [ereKanon](https://gitgud.io/umaera/game/ere-kanon) 中查看静态数据文件格式为 YAML 时的构建脚本。