
const router = require('koa-router')()
const controllers = require('../../controllers/admin')
// const { uploadImgDeal } = require('../../middleware/upload')

// router.use(uploadImgDeal)

const service = {
  user: '/user',
  upload: '/upload',
}

// global服务
router.get(`${service.user}/login`,controllers.user.loginApi)
router.get(`${service.user}/loginCode`,controllers.user.loginCodeApi)
router.post(`${service.upload}/img`,controllers.upload.uploadImgApi)

module.exports=router