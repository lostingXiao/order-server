
const router = require('koa-router')()
const controllers = require('../../controllers/admin')

const service = {
  user: '/user',
};

// global服务
router.get(`${service.user}/login`,controllers.user.loginApi);
router.get(`${service.user}/loginCode`,controllers.user.loginCodeApi);

module.exports=router