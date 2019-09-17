const router = require('koa-router')()

// const pageMiddleware = compose([pageLog, checkToken, getUserInfo]);
// app.use(pageMiddleware);
// pageConf.forEach((item) => {
//     // eslint-disable-next-line no-console
//     console.log(`监听路由页面： ${global.config.pathPrefixRE}${item}`);
//     const pageRouter = require(`./routes/pages/${item}`);
//     app.use(pageRouter.routes(), pageRouter.allowedMethods());
// });

// const a = require('./a1');
// router.use(a.routes(), a.allowedMethods());

// const router = require('koa-router')();

const page1 = async (ctx, next) => {
  await ctx.render('page1')
}
const page2 = async (ctx, next) => {
  console.log(ctx)
  await ctx.render('page2')
}
router.get('*/page1/*', page1)
router.get('*/page2/*', page2)

module.exports = router
