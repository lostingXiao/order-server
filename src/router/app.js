const router = require('koa-router')()
const { business,system } = require('../controllers/admin')
const { jwtMiddlewareDeal, platformMiddlewareDeal } = require('../middleware/jwt')
// const { uploadImgDeal } = require('../../middleware/upload')

// router.use(uploadImgDeal)

// router.use(platformMiddlewareDeal);
console.log('app路由配置')
router.use(jwtMiddlewareDeal)

const platform = '/app'

const service = {
  business: "/business",
  system: "/system",
  auth: "/auth",
  order: "/order",
};

// business
// shop
router.post(`${platform}${service.business}/shopList`, business.shopListApi)
router.post(`${platform}${service.business}/addShop`, business.addShopApi)
router.get(`${platform}${service.business}/shopAll`, business.shopAllApi)


module.exports = router;