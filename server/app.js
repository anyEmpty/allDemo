const Koa = require('koa')
const app = new Koa()
// const log = require('./middleware/logger-anysc.js')
const proxy = require('http-proxy-middleware')
const views = require('koa-views')
const path = require('path')

const router = require('./router.js')
const koaStatic = require('koa-static')
const koaConnect = require('koa2-connect')
function proxysss (context, options) {
  var proxys

  if (typeof options === 'string') {
    options = { target: options }
  }

  proxys = proxy(context, options)

  return async function (ctx, next) {
    await koaConnect(proxys)(ctx, next)
  }
}

app.use(proxysss('/tmcapp/tmcApi/',
  {
    target: 'http://tmc.t.ly.com/tmcapp/webapi/',
    changeOrigin: true,
    pathRewrite: {
      '^/tmcapp/tmcApi/': ''
    }
  }
))

let staticS = path.join(__dirname, '../dist')

app.use(views(staticS, {
  extension: 'html'
}))
app.use(koaStatic(
  path.join(__dirname, './../dist')
))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
console.log('the server is starting at port 3000')
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})
