const router = require('koa-router')()
const { shop,system,auth } = require('../../controllers/admin')
const { jwtMiddlewareDeal, platformMiddlewareDeal } = require('../../middleware/jwt')


// router.use(platformMiddlewareDeal);
// router.use(jwtMiddlewareDeal);

const service = {
  shop: "/shop",
  system: "/system",
  auth: "/auth",
  order: "/order",
};

// shop
router.get(`${service.shop}/shopList`, shop.shopListApi);
// system
router.get(`${service.system}/menuList`, system.menuListApi);
router.post(`${service.system}/addMenu`, system.addMenuApi);
router.post(`${service.system}/editMenu`, system.editMenuApi);
router.post(`${service.system}/delMenu`, system.delMenuApi);
// auth
router.post(`${service.auth}/addAuth`, auth.addAuthApi);


module.exports = router;