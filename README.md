# BasicsVue

> BasicsVue

## Build Setup

``` bash
#--------------如果您拿到了1个新项目，且已经安装了yarn ，初始化项目请从 第#3步 开始执行-------------------
#--------------如果您发现项目更新了package.json运行不了 ，请从 第#5步  开始执行-------------------------

#1.安装node.js  版本号：node-v16.X-x64.msi
下载地址：https://nodejs.org/download/release
#1.0  重装node.js   
#   如果有之前安装的node版本 ，请先卸载
#1) 去控制面板卸载node.js
#2) 删除C:\Users\Administrator(你的账号名)\AppData\Roaming下边的npm、npm-cache两个文件夹
#3）重启电脑（很重要）
#4) 重新安装node.js，再次在dos中输入node -v和npm -v可以看到相应的版本号

#1.1 安装npm国内淘宝镜像 cnpm（以后用cnpm替代npm）
npm install -g cnpm --registry=https://registry.npm.taobao.org
#1.2 安装node全局（命令-g）脚手架 CLI3.X版本
cnpm install -g @vue/cli@3.6.3  
#1.3安装完成后 Cli3版本查看（请重启cmd或者终端，否则可能提示找不到命令）
vue -V
#2.打开终端，通过终端执行命令安装yarn
#安装完毕后查看版本命令：yarn --version
cnpm install -g yarn  

#3.安装yarn淘宝镜像
yarn config set registry https://registry.npm.taobao.org -g 

# 4.初始化项目
#如果初始化时报错Error: not found: python2 /check python checking for Python executable "python" in the PATH,
#请执行 3后再初始化
yarn install

# 5.启动项目
yarn serve

# 6.添加包（会更新package.json和yarn.lock）
#在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
yarn add [package]  #例子：yarn add ant-design-vue
 #安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
yarn add [package]@[version] #例子：yarn add ant-design-vue@1.4.0
# 7.删除包
yarn remove [package]  #例子：yarn remove ant-design-vue

# 8.发布打包项目  
#打包完成后  在代码目录中找到发布目录dist
#将dist发布到IIS等服务中进行预览
yarn build

# 9.前端各个模块大小可视化分析，帮助你定位问题所在模块
# 执行完毕后再dist目录下 打开 report.html 文件查看
yarn run build --report

目录结构
├─public                            静态资源目录，存放不需要webpack打包的文件
│  └─cdn                           本地cdn目录，存放不需要打包的vue.js等文件             
├─ node_modules           包引用相关，非常庞大 请在git更新列表（根目录.gitignore中进行配置）中屏蔽
├─src                                源代码目录
│  ├─assets                             静态资源目录，存放主题 字体等静态资源
│  ├─common                         公共文件目录 css/imgages/js/less
│  │  ├─css                              
│  │  ├─images
│  │  ├─js
│  │  └─less
│  ├─components           公共组件，全局文件
│  ├─modules                  多页应用模块
│  │  └─zenithform          多页应用--自定义表单
│  ├─router                      路由，统一管理
│  ├─service                     服务相关、数据相关目录
│  │  ├─api                              接口目录，模块与视图文件夹对应
│  │  │  └─sysManage                eg:模块名，与views/sysManage对应
│  │  ├─datas                           静态模拟数据目录
│  │  ├─filters                           过滤器，与后台通讯工具
│  │  ├─lib                                外部引用的插件存放及修改文件
│  │  ├─mock                           模拟接口数据目录
│  │  └─zdk                              公司自定义公共工具类目录
│  ├─views                       视图目录，模块与service api文件夹对应
│  │  │  └─sysManage            eg:模块名，与views/sysManage对应
├── vue.config.js            配置相关,配置前端服务端口号，IP地址等
├── .babelrc                   babel-loader 配置
├── .gitignore                 git管理忽略配置项
├── favicon.ico                favicon图标
├── index.html                 html模板
├── yarn.lock                   引入包版本锁定，用于版本控制用。
└── package.json             脚手架配置文件，建议不要手动更改，使用yarn add/remove等命令进行操作 

