// import privateRouter from "./private"
// import publicRouter from "./public"
// import openRouter from "./open"
// import appRouter from "./app/index"
// // import adminRouter from "./admin/index"

// const appRouter = require('./app')
// const adminRouter = require('./admin')

// export default { appRouter, adminRouter }


const router = require('koa-router')()
const appRouter = require('./app')
const adminRouter = require('./admin')


router.use('/admin',adminRouter.routes(), adminRouter.allowedMethods())
// router.use('/app',appRouter.routes(), appRouter.allowedMethods())


module.exports = router