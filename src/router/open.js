
const router = require('koa-router')()
const { public: adminPublic } = require('../controllers/admin')

const platform = '/public'

const service = {
  admin: '/admin',
  app: '/app',
}

// 管理后台商家服务
router.post(`${platform}${service.admin}/login`,adminPublic.loginApi)
router.get(`${platform}${service.admin}/loginCode`,adminPublic.loginCodeApi)
router.post(`${platform}${service.admin}/uploadImg`,adminPublic.uploadImgApi)

module.exports=router