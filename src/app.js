const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const { errorHandler, responseHandler } = require('./middleware/response')
const { uploadImgDeal } = require('./middleware/upload')

const index = require('./routes/index')
const router = require('./router/index')

onerror(app)


// 使用中间件
app.use(uploadImgDeal()) //图片文件上传
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
app.use(router.routes(), router.allowedMethods())
app.use(responseHandler);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
