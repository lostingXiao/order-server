const CODE = require('../config/code')
const { decodeToken, decrypt } = require('../utils/util')
const PLATFORM = require('../config/constant')
const { getUserInfoByIdService } = require('../services/public/index')
// const { getUserInfoByIdService: getAppUserInfoByIdService } = require('../services/app/system')


const jwtMiddlewareDealHttp = async (ctx, next) => {
  const token = ctx.request.headers.token
  if (typeof token === "string") {
    try {
      const  decodeMgs = decodeToken(token)
      const { userId, tableId } = decodeMgs
      if(!userId && !tableId){
        throw new Error('token不合法')
      }
      const { userInfo } = await getUserInfoByIdService({userId,tableId})
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

const jwtMiddlewareDealSocket = async (socket, next) => {
  console.log('jwtMiddlewareDealSocket')
  const code = socket.handshake.auth.code
  console.log(code)
  if (typeof code === 'string') {
    try {
      const tableId = decrypt(code)
      console.log(tableId)
      if( !tableId ) socket.disconnect()
      await getUserInfoByIdService({tableId})
      socket.tableId = tableId
    } catch (error) {
      socket.disconnect()
    }
  } else {
    socket.disconnect()
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
  jwtMiddlewareDealHttp,
  jwtMiddlewareDealSocket,
  platformMiddlewareDeal
}
