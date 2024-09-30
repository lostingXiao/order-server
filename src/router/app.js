const router = require('koa-router')()
const { order } = require('../controllers/app')
const { jwtMiddlewareDealApp, platformMiddlewareDeal } = require('../middleware/jwt')

router.use(jwtMiddlewareDealApp)
console.log('app服务-----')

const platform = '/app'

const service = {
  business: '/business',
  order: '/order',
}

// app/order/test

// order
// router.post(`${platform}${service.order}/goodsList`, order.goodsListApi)
// router.post(`${platform}${service.order}/shopList`, business.shopListApi)
router.post(`${platform}${service.order}/goodsList`, order.goodsListApi)
router.get(`${platform}${service.order}/test`, async (ctx, next) => {
  ctx.body ={logincode: '1112121212121212'}
  return next()
})

console.log('router----')


module.exports = router