import koaRouter from "koa-router";
const router = new koaRouter();

router.use('/app',admin.routes(), admin.allowedMethods())
router.use('/app',admin.routes(), admin.allowedMethods())

module.exports = router