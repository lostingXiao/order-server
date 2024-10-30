const router = require('koa-router')()
const { order } = require('../controllers/app')
const { jwtMiddlewareDealHttp, platformMiddlewareDeal } = require('../middleware/jwt')

router.use(jwtMiddlewareDealHttp)

const platform = '/app'

const service = {
  business: '/business',
  order: '/order',
}

// order
router.post(`${platform}${service.order}/goodsList`, order.goodsListApi)
router.post(`${platform}${service.order}/createOrder`, order.createOrderApi)
router.post(`${platform}${service.order}/orderList`, order.orderListApi)




module.exports = router