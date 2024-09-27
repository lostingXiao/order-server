const router = require('koa-router')()
const { order } = require('../controllers/app')
const { jwtMiddlewareDealApp, platformMiddlewareDeal } = require('../middleware/jwt')

router.use(jwtMiddlewareDealApp)

// router.use(platformMiddlewareDeal);
console.log('app路由配置')

const platform = '/app'

const service = {
  business: '/business',
  order: '/order',
}

// order
router.post(`${platform}${service.order}/goodsList`, order.goodsListApi)



module.exports = router