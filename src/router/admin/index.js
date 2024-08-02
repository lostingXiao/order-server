const router = require('koa-router')()
const admin = require('./admin')
const open = require('./open')

router.use(admin.routes(), admin.allowedMethods())
router.use(open.routes(), open.allowedMethods())

module.exports = router