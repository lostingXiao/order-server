const router = require('koa-router')()
const admin = require('./admin')

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.use('/admin',admin.routes(), admin.allowedMethods())

router.redirect('/','/string')

module.exports = router
