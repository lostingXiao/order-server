import controllers from "../controllers";
import koaRouter from "koa-router";

const router = new koaRouter();

const service = {
  global: "",
  user: "/user",
  product: "/product",
  banner: "/banner",
  order: "/order",
};

// global服务
// 微信支付结果通知
router.post(
  `${platform}${service.global}/notify/wxMiniPay`,
  controllers.app_global.wxMiniPayNoticeApi,
);

export default router;