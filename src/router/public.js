import controllers from "../controllers";
import koaRouter from "koa-router";
import { platformMiddlewareDeal } from "../middleware/jwt";

const router = new koaRouter();

router.use(platformMiddlewareDeal);

const platform = "/game";

const service = {
  global: "",
  user: "/user",
  product: "/product",
  banner: "/banner",
  order: "/order",
};

// global服务
// 测试接口
router.get(`${platform}${service.global}/test`)

export default router;
