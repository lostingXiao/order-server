const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const { errorHandler, responseHandler } = require('./middleware/response')
const koaBody = require('./middleware/koaBody')

const openRouter = require('./router/open')
const adminRouter = require('./router/admin')
const appRouter = require('./router/admin')

onerror(app)

// 使用中间件
app.use(koaBody()) //请求处理
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(errorHandler)

// routes
// app.use(router.routes()).use(router.allowedMethods())

app.use(openRouter.routes()).use(openRouter.allowedMethods())
app.use(adminRouter.routes()).use(adminRouter.allowedMethods())
app.use(appRouter.routes()).use(appRouter.allowedMethods())


app.use(responseHandler);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
