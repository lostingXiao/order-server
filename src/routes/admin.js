const admin = require('koa-router')()

admin.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'admin'
  })
})

admin.get('/string', async (ctx, next) => {
  ctx.body = 'admin string'
})

admin.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'admin json'
  }
})

module.exports = admin
