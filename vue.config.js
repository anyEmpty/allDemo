const opt = require('open')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
function getIPAdress () {
  let interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
const ip = getIPAdress()

// vue.config.js
module.exports = {
  // 选项...
  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',

  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: './',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@components', resolve('src/components'))
      .set('@com', resolve('src/common'))
      .set('@widgets', resolve('src/widgets'))
      .end()
  },
  pages: {
    page1: {
      // page 的入口
      entry: `src/pages/page1/index.js`,
      // 模板来源
      template: 'src/pages/page1/index.html',
      // 在 dist/index.html 的输出
      filename: 'page1.html'
    },
    page2: {
      // page 的入口
      entry: `src/pages/page2/index.js`,
      // 模板来源
      template: 'src/pages/page2/index.html',
      // 在 dist/index.html 的输出
      filename: 'page2.html'
    }
  },
  devServer: {
    port: 9000, // 端口号
    host: ip,
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器,
    index: '/page1.html', // 启动项目后，默认进入的页面地址
    // historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        { from: new RegExp('/page1/'), to: '/page1.html' },
        { from: new RegExp('/page2/'), to: '/page2.html' }
      ]
    },
    proxy: {
      '/tmcapp/tmcApi/': {
        target: 'http://tmc.t.ly.com/tmcapp/webapi/',
        changeOrigin: true,
        pathRewrite: {
          '^/tmcapp/tmcApi/': ''
        }
      }
    }
  }
}
