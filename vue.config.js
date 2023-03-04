const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzer
const path = require('path')

// // 1. 引入等比适配插件
// const px2rem = require('postcss-plugin-px2rem')

// // 2. 配置基本大小
// const postcss = px2rem({
//     rootValue: 16, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
//     // unitPrecision: 5, //允许REM单位增长到的十进制数字。
//     //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
//     // propBlackList: [], //黑名单
//     exclude: false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
//     // selectorBlackList: [], //要忽略并保留为px的选择器
//     // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
//     // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
//     mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
//     // minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
// })

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

// 本地环境是否需要使用cdn引入模式，开起时，Devtools不可用。
//如需调试，请设置为false 并把vue.use（element）那段注释打开。开发完成后打包时请屏蔽，不然会打包到主index.js中去
const devNeedCdn = true;

const pathPublic = '/web';

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'element-ui': 'ELEMENT'
    },
    // cdn的css链接
    css: [
      pathPublic+'/cdn/element-ui/2.15.13/index.css',
    ],
    // cdn的js链接
    js: [
      pathPublic+'/cdn/vue/2.6.10/vue.min.js',
      pathPublic+'/cdn/vuex/vuex.min.js',
      pathPublic+'/cdn/vue-router/3.1.3/vue-router.min.js',
      pathPublic+'/cdn/axios/0.18.1/axios.min.js',
      pathPublic+'/cdn/element-ui/2.15.13/index.js',
    ]
}


module.exports = {
  publicPath: pathPublic,// 部署应用包时的基本 URL,从 Vue CLI 3.3 起已弃用baseUrl
  outputDir: 'web',// build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  assetsDir: '',// build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: 'index.html',// 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true,// 默认在生成的静态资源文件名中包含hash以控制缓存
  runtimeCompiler: true,// 是否使用包含运行时编译器的 Vue 构建版本，需要源码调试时请设为true
  productionSourceMap: false,// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  parallel: require('os').cpus().length > 1,// 构建时开启多进程处理babel编译
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    host: '127.0.0.1',//服务IP地址 本地调试客填写本机IP或者localhost
    port: 9870,//端口号
    https: false,//是否是https链接
    // 反向代理 ( 跨域 ) 配置
    // proxy: {
    //   '/api': {    // search为转发路径
    //       target: 'http://192.168.3.124:9870',  // 后台API服务器地址
    //       ws: true, // 是否代理websockets
    //       changeOrigin: true,   // 设置同源  默认false，是否需要改变原始主机头为目标URL,               /mydemo_Web_exploded/
    //       pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
    //       '^/api': '/screen/'
    //     }
    //   },
    // },
    overlay: {
      warnings: false,
      errors: true
    },
  },

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: false,//process.env.NODE_ENV !== 'production',
  transpileDependencies: [],// Babel 显式转译列表
  //crossorigin: '',// 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  integrity: false,// 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)

  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: config => {
    // 移除 prefetch 插件  避免webpack在首页就引用所有生成的JS
    config.plugins.delete('prefetch-index')
    config.resolve.symlinks(true)
    //兼容IE9+浏览器
    config.entry('main').add('babel-polyfill').end() // main是入口js文件
    // config.plugin('context')
    //   .use(webpack.ContextReplacementPlugin,
    //     [/moment[/\\]locale$/, /zh-cn/])
    // 打包文件带hash
    config.output.filename('[name].[hash:7].js').end()
    config.output.chunkFilename('views/[name].[chunkhash:7].js').end()
    // 为了补删除换行而加的配置
    config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = true
        return options
    }).end()

      //图片压缩image-webpack-loader
     // 默认设置
    // const defaultOptions = {
    //   bypassOnDebug: true
    // }
    // //  自定义设置 增加压缩率
    // const customOptions = {
    //     mozjpeg: {
    //       progressive: true,
    //       quality: 50
    //     },
    //     optipng: {
    //       enabled: true,
    //     },
    //     pngquant: {
    //       quality: [0.5, 0.65],
    //       speed: 4
    //     },
    //     gifsicle: {
    //       interlaced: false,
    //     },
    // }
    // config.module
    //     .rule('images')
    //     .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options(customOptions)
    //     .end()

    // 修改fonts loader设置
    config.module.rule('fonts')
      .test(/\.(eot|ttf|otf|woff|woff2?)(\?.*)?$/)
      .end()
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      //'vuex': 'Vuex',
      'axios': 'axios',
      //'element-ui': 'ELEMENT',
    }
    // 打包分析
     // ============注入cdn start============
     config.plugin('html-index').tap(args => {
      // // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
    // ============注入cdn start============
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }])
    }

  },

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  configureWebpack:config=> {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals
    // config.entry = {
    //     main: './src/main.js',
    //     router: './src/router/index.js'
    // },
    config.resolve= { // 配置解析别名
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@img': path.resolve(__dirname, './src/assets/images'),
        'vue$': 'vue/dist/vue.esm.js',
        'api': path.resolve(__dirname, '../src/api'),
      }
    },
    config.optimization= {
      splitChunks: {
        chunks: 'all'
      },
    },
    config.optimization= {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true, // 移除console
              drop_debugger: true,// 移除debugger
              pure_funcs: ['console.log','console.debug'] // 移除console
            }
          }
        })
      ]
    }
  },

  // 构建多页面应用，页面的配置
  pages: {
    index: {
      // page 的入口
      entry: './src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    //zform: 'src/modules/zform/zform.js'//自定义表单模块
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/zform.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
  },

  // css的处理
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    modules: false,  // 设置为true时，使用全局element-ui会造成无法找到字体和图标文件 .woff .ttf
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    }
  },



  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,

  // 向 PWA 插件传递选项
  pwa: {},

  // 可以用来传递任何第三方插件选项
  pluginOptions: {},

}
