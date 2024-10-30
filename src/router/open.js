
const router = require('koa-router')()
const { public: adminPublic } = require('../controllers/admin')
const { public: appPublic } = require('../controllers/app')

const platform = '/public'

const service = {
  admin: '/admin',
  app: '/app',
}

// 管理后台商家服务
router.post(`${platform}${service.admin}/login`,adminPublic.loginApi)
router.get(`${platform}${service.admin}/loginCode`,adminPublic.loginCodeApi)
router.post(`${platform}${service.admin}/uploadImg`,adminPublic.uploadImgApi)

// webapp 用户端
router.post(`${platform}${service.app}/login`,appPublic.loginApi)

module.exports=router