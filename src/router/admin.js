const router = require('koa-router')()
const { business,system } = require('../controllers/admin')
const { jwtMiddlewareDeal, platformMiddlewareDeal } = require('../middleware/jwt')
// const { uploadImgDeal } = require('../../middleware/upload')

// router.use(uploadImgDeal)

// router.use(platformMiddlewareDeal);
console.log('admin路由配置')
router.use(jwtMiddlewareDeal)

const platform = '/admin'

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
router.post(`${platform}${service.business}/shopDetail`, business.shopDetailApi)
router.post(`${platform}${service.business}/editShop`, business.editShopApi)




// system
// menu
router.get(`${platform}${service.system}/menuList`, system.menuListApi)
router.post(`${platform}${service.system}/addMenu`, system.addMenuApi)
router.post(`${platform}${service.system}/editMenu`, system.editMenuApi)
router.post(`${platform}${service.system}/delMenu`, system.delMenuApi)
// auth
router.post(`${platform}${service.system}/addAuth`, system.addAuthApi)
router.post(`${platform}${service.system}/authList`, system.authListApi)
router.get(`${platform}${service.system}/authAll`, system.authAllApi)

// role
router.post(`${platform}${service.system}/addRole`, system.addRoleApi)
router.post(`${platform}${service.system}/roleList`, system.roleListApi)
router.get(`${platform}${service.system}/roleAll`, system.roleAllApi)
router.post(`${platform}${service.system}/roleDetail`, system.roleDetailApi)
router.post(`${platform}${service.system}/editRole`, system.editRoleApi)


// user
router.post(`${platform}${service.system}/userList`, system.userListApi)
router.post(`${platform}${service.system}/addUser`, system.addUserApi)
router.post(`${platform}${service.system}/getUserInfo`, system.getUserInfoApi)






module.exports = router;