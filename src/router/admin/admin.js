const router = require('koa-router')()
const { shop,system } = require('../../controllers/admin')
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
router.get(`${service.shop}/shopList`, shop.shopListApi)
// system
// menu
router.get(`${service.system}/menuList`, system.menuListApi)
router.post(`${service.system}/addMenu`, system.addMenuApi)
router.post(`${service.system}/editMenu`, system.editMenuApi)
router.post(`${service.system}/delMenu`, system.delMenuApi)
// auth
router.post(`${service.system}/addAuth`, system.addAuthApi)
router.post(`${service.system}/authList`, system.authListApi)
router.get(`${service.system}/authAll`, system.authAllApi)

// role
router.post(`${service.system}/addRole`, system.addRoleApi)
router.post(`${service.system}/roleList`, system.roleListApi)
router.get(`${service.system}/roleAll`, system.roleAllApi)

// user
router.post(`${service.system}/userList`, system.userListApi)






module.exports = router;