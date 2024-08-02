import koaRouter from "koa-router";
import controllers from "../controllers";
import { jwtMiddlewareDeal, platformMiddlewareDeal } from "../middleware/jwt";

const router = new koaRouter();

router.use(platformMiddlewareDeal);
router.use(jwtMiddlewareDeal);

const platform = "/game";

const service = {
  global: "",
  user: "/user",
  product: "/product",
  banner: "/banner",
  order: "/order",
};

// user服务
// 忘记密码
router.post(
  `${platform}${service.user}/password/change`,
  controllers.app_user.userPasswordChangeApi,
);

export default router;