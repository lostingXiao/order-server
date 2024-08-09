
const { 
  uploadImgService,
  getUserIdService
} = require('../../services/admin/public')

const { generatorToken } =require('../../utils/util')

//用户登录
const loginApi = async (ctx, next) => {
  console.log('loginApi-------------')
  console.log(ctx.request.body.body)
  try{
    const { password, username } = ctx.request.body.body || {}
    // 获取用户id
    const user = await getUserIdService({ username, password })
    console.log('userId+++++++++++')
    console.log(user)
    if(user.length) {
      const userId = user[0].id
      const token = generatorToken(userId)
      ctx.body = { userId,token }
    } else {
      throw new Error('账号或密码错误')
    }
  }catch(err){
    throw err
  }
  return next()


}

//用户登录
const loginCodeApi = async (ctx, next) => {
  // let {pageSize = 10, pageNum = 1, name=''} = (ctx.request.query || {}) 
  // offset = Number(offset)
  // limit = Number(limit)

  // 获取列表
  // const shopList = await getGroupListService({pageSize, pageNum, name})

  // ctx.body = {count: groupInfo.count, list: groupInfo.rows}
  ctx.body ={logincode: '12345'}
  return next()
}


//图片上传
const uploadImgApi = async (ctx, next) => {
  try{
    const file = ctx.request.files.file;
    const url = await uploadImgService(file)
    ctx.body={url}
  }catch(err){
    throw err
  }
  return next()
}

module.exports = {
  uploadImgApi,
  loginApi,
  loginCodeApi,
}

