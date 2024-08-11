const CODE = require('../config/code')
const {decodeToken} = require('../utils/util')
const PLATFORM = require('../config/constant')
const { getUserInfoByIdService } = require('../services/admin/system')


const jwtMiddlewareDeal = async (ctx, next) => {
  console.log('jwtMiddlewareDeal')
  console.log(ctx.request.headers)
  const token = ctx.request.headers.token
  console.log('token----------------')
  console.log(token)
  console.log(typeof token === 'string')
  if (typeof token === "string") {
    try {
      console.log('decodeToken')
      console.log(decodeToken)
      const  decodeMgs = decodeToken(token)
      const { userId } = decodeMgs
      console.log('userId++++++++++')
      console.log(userId)
      if(!userId){
        throw new Error('token不合法')
      }
      const info = await getUserInfoByIdService(userId)
      const userInfo = info[0]
      console.log("userInfo++++++++++++++++++++")
      console.log(userInfo)
      if (!userInfo) {
        throw CODE.tokenFailed;
      } else {
        ctx.userId = Number(userId);
        ctx.userInfo = userInfo;
      }
    } catch (error) {
      console.log( '} catch (error) {' )
      console.log( error )
      throw error
    }
  } else {
    throw CODE.tokenFailed;
  }
  return next();
};

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
  jwtMiddlewareDeal,
  platformMiddlewareDeal
}
