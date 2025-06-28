// src/app/(main)/components/OfficialWebsite/markdown/introduce-markdown.tsx
export default `
# EasyPost 介绍

> EasyPost 是 API 文档、调试、Mock、测试一体化协作平台，定位 \`Postman + Swagger + Mock + JMeter\`。通过一套系统、一份数据，解决多个系统之间的数据同步问题。只要定义好 API 文档，API 调试、API 数据 Mock、API 自动化测试就可以直接使用，无需再次定义；API 文档和 API 开发调试使用同一个工具，API 调试完成后即可保证和 API 文档定义完全一致。高效、及时、准确！

#### [EasyPost](https://www.apifox.cn/) 官网：[www.apifox.cn](https://www.apifox.cn/)

:::tip 下载 PPT

需要 EasyPost 功能介绍 PPT 版本的（可用于团队内部分享/推广 EasyPost），可点击以下链接下载。

[EasyPost 功能介绍 ppt 格式](https://cdn3.apifox.cn/www%2Fassets%2Fppt%2FApifox%E4%BB%8B%E7%BB%8D.pptx)

[EasyPost 功能介绍 pdf 格式](https://cdn3.apifox.cn/www%2Fassets%2Fppt%2FApifox%E4%BB%8B%E7%BB%8D.pdf)

:::

## 接口管理现状

### 一、常用解决方案

1. 使用 Swagger 作为[接口文档工具](https://www.apifox.cn/)
1. 使用 Postman 调试接口
1. 使用 RAP 等工具 Mock 数据
1. 使用 JMeter 做接口自动化测试

### 二、存在的问题

维护不同工具之间数据一致性非常困难、低效。并且这里不仅仅是工作量的问题，更大的问题是多个系统之间数据不一致，导致协作低效、频繁出问题，开发测试人员痛苦不堪。

1. 开发人员在 Swagger 定义好文档后，接口调试的时候还需要去 Postman 再定义一遍。
1. 前端开发 Mock 数据的时候又要去 RAP 定义一遍，还需要手动设置 Mock 规则。
1. 测试人员需要去 JMeter 再定义一遍。
1. 前端根据 RAP Mock 出来的数据开发完，后端根据 Swagger 定义的接口文档开发完，各自都试测试通过了，本以为可以马上上线，结果一对接发现各种问题：
   - 开发过程中接口变更了，只修改了 Swagger，但是没有及时同步修改 RAP。
   - 后端开发的接口数据类型和文档不一致，肉眼难以发现问题。
1. 同样，测试在 JMeter 写好的测试用例，真正运行的时候也会发现各种不一致。
1. 时间久了，各种不一致会越来越严重。

## EasyPost 解决方案

### 一、如何解决这些问题

#### 1、EasyPost 定位

\`EasyPost = Postman + Swagger + Mock + JMeter\`

通过一套系统、一份数据，解决多个系统之间的数据同步问题。只要定义好接口文档，接口调试、数据 Mock、接口测试就可以直接使用，无需再次定义；接口文档和接口开发调试使用同一个工具，接口调试完成后即可保证和接口文档定义完全一致。高效、及时、准确！

#### 2、EasyPost 宗旨

节省研发团队的每一分钟！

#### 3、EasyPost 功能

1. **接口设计**：EasyPost 接口文档遵循 [OpenApi](https://www.openapis.org/) 3.0 (原 Swagger)、[JSON Schema](https://json-schema.org/) 规范的同时，提供了非常好用的\`可视化\`文档管理功能，零学习成本，非常高效。并且支持在线分享接口文档。
2. **数据模型**：可复用的数据结构，定义接口\`返回数据结构\`及\`请求参数数据结构\`（仅 JSON 和 XML 模式）时可直接引用。支持模型直接嵌套引用，直接 JSON/XML 智能导入，支持 oneOf、allOf 等高级组合模式。
3. **接口调试**：Postman 有的功能，比如环境变量、前置/后置脚本、Cookie/Session 全局共享 等功能，Apifox 都有，并且比 Postman 更高效好用。接口运行完之后点击\`保存为用例\`按钮，即可生成\`接口用例\`，后续可直接运行接口用例，无需再输入参数，非常方便。自定义脚本 100% 兼容 Postman 语法，并且支持运行javascript、java、python、php、js、BeanShell、go、shell、ruby、lua等各种语言代码。
4. **接口用例**：通常一个接口会有多种情况用例，比如\`参数正确\`用例、\`参数错误\`用例、\`数据为空\`用例、\`不同数据状态\`用例等等。运行接口用例时会自动校验数据正确性，用接口用例来调试接口非常高效。
5. **接口数据 Mock**：内置 [Mock.js](http://mockjs.com/) 规则引擎，非常方便 mock 出各种数据，并且可以在定义数据结构的同时写好 mock 规则。支持添加“期望”，根据请求参数返回不同 mock 数据。最重要的是 Apifox \`零配置\` 即可 Mock 出非常人性化的数据，具体在本文后面介绍。
6. **数据库操作**：支持读取数据库数据，作为接口请求参数使用。支持读取数据库数据，用来校验(断言)接口请求是否成功。
7. **接口自动化测试**：提供接口集合测试，可以通过选择接口（或接口用例）快速创建测试集。目前接口自动化测试更多功能还在开发中，敬请期待！目标是： JMeter 有的功能基本都会有，并且要更好用。
8. **快捷调试**：类似 Postman 的接口调试方式，主要用途为临时调试一些\`无需文档化\`的接口，无需提前定义接口即可快速调试。
9. **代码生成**：根据接口及数据数据模型定义，系统自动生成\`接口请求代码\`、\`前端业务代码\`及\`后端业务代码\`。
10. **团队协作**：EasyPost 天生就是为团队协作而生的，接口云端实时同步更新，成熟的\`团队/项目/成员权限\`管理，满足各类企业的需求。


### 二、EasyPost 做的不仅仅是数据打通

如果你认为 EasyPost 只做了数据打通，来提升研发团队的效率，那就错了。EasyPost 还做了非常多的创新，来提升开发人员的效率。

#### 1、调试时自动校验数据结构

使用 EasyPost 调试接口的时候，系统会根据接口文档里的定义，自动校验返回的数据结构是否正确，无需通过肉识别，也无需手动写断言脚本检测，非常高效！

![EasyPost 自动校验数据结构](http://cdn.apifox.cn/www/docs/api-case/auto-validation-schema.jpg)

#### 2、数据模型定义、引用

可以独立定义数据模型，接口定义时可以直接引用数据模型，数据模型之间也可以相互引用。同样的数据结构，只需要定义一次即可多处使用；修改的时候只需要修改一处，多处实时更新，避免不一致。

#### 3、接口用例管理

通常一个接口会有多种情况用例，比如 \`正确用例\` \`参数错误用例\` \`数据为空用例\` \`不同数据状态用例\`。定义接口的时候定义好这些不同状态的用例，接口调试的时候直接运行，非常高效。

#### 4、零配置 Mock 出非常人性化的数据

先放一张图对比下 EasyPost 和其他同类工具 \`零配置\` mock 出来的数据效果：

![EasyPost Mock 数据结果对比同类工具](http://cdn.apifox.cn/www/docs/mock/mock-result-compare.jpg)

可以看出 EasyPost \`零配置\` Mock 出来的数据和真实情况是非常接近的，前端开发可以直接使用，而无需再手动写mock规则。

EasyPost 如何做到高效率、零配置生成非常人性化的 mock 数据：

1. EasyPost 根据接口定义里的数据结构、数据类型，自动生成 mock 规则。
2. EasyPost 内置智能 mock 规则库，根据字段名、字段数据类型，智能优化自动生成的 mock 规则。如：名称包含字符串\`image\`的\`string\`类型字段，自动 mock 出一个图片地址 URL；包含字符串\`time\`的\`string\`类型字段，自动 mock 出一个时间字符串；包含字符串\`city\`的\`string\`类型字段，自动 mock 出一个城市名。
3. EasyPost 根据内置规则，可自动识别出图片、头像、用户名、手机号、网址、日期、时间、时间戳、邮箱、省份、城市、地址、IP等字段，从而 Mock 出非常人性化的数据。
4. 除了内置 mock 规则，用户还可以自定义规则库，满足各种个性化需求。支持使用 \`正则表达式\`、\`通配符\` 来匹配字段名自定义 mock 规则。

#### 5、代码自动生成

根据接口模型定义，自动生成各种语言/框架（如 TypeScript、Java、Go、Swift、ObjectiveC、Kotlin、Dart、C++、C#、Rust 等）的业务代码（如 Model、Controller、单元测试代码等）和接口请求代码。目前 Apifox 支持 130 种语言及框架的代码自动生成。

更重要的是：你可以通过\`自定义代码模板\`来生成符合自己团队的架构规范的代码，满足各种个性化的需求。

#### 6、导入、导出

1. 支持导出 \`OpenApi (原Swagger)\`、\`Markdown\`、\`Html\` 等数据格式，因为可以导出\`OpenApi\`格式数据，所以你可以利用 OpenApi (Swagger) 丰富的生态工具完成各种接口相关的事情。
2. 支持导入 \`OpenApi (原Swagger)\`、\`Postman\`、\`HAR\`、\`RAML\`、\`RAP2\`、\`YApi\`、\`Eolinker\`、\`DOClever\`、\`ApiPost\` 、\`Apizza\` 、\`API Blueprint\`、\`I/O Docs\`、\`WADL\`、\`Google Discovery \`等数据格式，方便旧项目迁移。

### 三、更多 EasyPost 功能截图

![接口调试](https://cdn3.apifox.cn/www/screenshot/apifox-api-case-1.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-api-case-2.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-api-definition-1.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-schema-1.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-api-definition-2.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-test-case-1.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-test-case-2.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-test-case-3.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-test-case-4.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-mock-1.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-mock-2.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-mock-3.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-codegen-1.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-codegen-2.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-setting-import-1.png)

![](https://cdn3.apifox.cn/www/screenshot/apifox-setting-export-1.png)

![Apifox 多种主题色可选](https://cdn3.apifox.cn/www/screenshot/light-apifox-theme-1.png)

### 五、 Apifox 下载地址

请访问 Apifox 官网下载：[https://www.apifox.cn/](https://www.apifox.cn/)

[接口文档工具](https://www.apifox.cn/)

`;