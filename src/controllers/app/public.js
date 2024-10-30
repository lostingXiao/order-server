
const { getUserIdService, getTableIdService } = require('../../services/app/public')

const { generatorToken } =require('../../utils/util')

//用户登录
const loginApi = async (ctx, next) => {
  try{
    const { password, username, code } = ctx.request.body || {}
    // 获取用户id
    const user = await getUserIdService({ username, password })
    const tableId = await getTableIdService( code )
    const userId = user?.id || ''
    if(userId || tableId) {
      const userId = user ? user.id : ''
      const token = generatorToken({userId,tableId})
      ctx.body = { token }
    } else {
      throw new Error(code ? '无效' :'账号或密码错误')
    }
  }catch(err){
    throw err
  }
  return next()
}

module.exports = {
  loginApi,
}

