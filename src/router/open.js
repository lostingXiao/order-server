
const router = require('koa-router')()
const { public } = require('../controllers/admin')

// global服务
router.post(`/public/login`,public.loginApi)
router.get(`/public/loginCode`,public.loginCodeApi)
router.post(`/public/uploadImg`,public.uploadImgApi)

module.exports=router