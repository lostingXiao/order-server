const CODE = require('../config/code')
const {decodeToken} = require('../utils/util')
const PLATFORM = require('../config/constant')
const { getUserInfoByIdService: getAdminUserInfoByIdService } = require('../services/admin/system')
const { getUserInfoByIdService: getAppUserInfoByIdService } = require('../services/app/business')


const jwtMiddlewareDealAdmin = async (ctx, next) => {
  const token = ctx.request.headers.token
  if (typeof token === "string") {
    try {
      const  decodeMgs = decodeToken(token)
      const { userId } = decodeMgs
      if(!userId){
        throw new Error('token不合法')
      }
      const userInfo = await getAdminUserInfoByIdService(userId)
      if (!userInfo) {
        throw CODE.tokenFailed
      } else {
        ctx.userId = Number(userId)
        ctx.userInfo = userInfo
      }
    } catch (error) {
      throw error
    }
  } else {
    throw CODE.tokenFailed
  }
  return next()
}

const jwtMiddlewareDealApp = async (ctx, next) => {
  const token = ctx.request.headers.token
  if (typeof token === "string") {
    try {
      const decodeMgs = decodeToken(token)
      const { userId, tableId } = decodeMgs
      if(!userId && !tableId ){
        throw new Error('token不合法')
      }
      const userInfo = await getAppUserInfoByIdService(userId)
      if (!userInfo) {
        throw CODE.tokenFailed
      } else {
        ctx.userId = Number(userId)
        ctx.tableId = Number(tableId)
        ctx.userInfo = userInfo
      }
    } catch (error) {
      throw error
    }
  } else {
    throw CODE.tokenFailed
  }
  return next()
}

// 校验header中platform是否合法
const platformMiddlewareDeal = async (ctx, next) => {
  const { platform } = ctx.request.headers
  // @ts-ignore
  if (!PLATFORM[platform]) {
    throw CODE.missingParameters;
  }
  ctx.platform = platform;
  return next();
};

module.exports = {
  jwtMiddlewareDealAdmin,
  jwtMiddlewareDealApp,
  platformMiddlewareDeal
}
