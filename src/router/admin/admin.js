const router = require('koa-router')()
const { shop,system } = require('../../controllers/admin')
const { jwtMiddlewareDeal, platformMiddlewareDeal } = require('../../middleware/jwt')


// router.use(platformMiddlewareDeal);
// router.use(jwtMiddlewareDeal);

const service = {
  shop: "/shop",
  system: "/system",
  banner: "/banner",
  order: "/order",
};

// shop
router.get(`${service.shop}/shopList`, shop.shopListApi);
// system
router.get(`${service.system}/menuList`, system.menuListApi);
router.post(`${service.system}/addMenu`, system.addMenuApi);
router.post(`${service.system}/editMenu`, system.editMenuApi);
router.post(`${service.system}/delMenu`, system.delMenuApi);



module.exports = router;