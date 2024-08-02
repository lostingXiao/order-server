
//用户登录
const loginApi = async (ctx, next) => {
  // let {pageSize = 10, pageNum = 1, name=''} = (ctx.request.query || {}) 
  // offset = Number(offset)
  // limit = Number(limit)

  // 获取列表
  // const shopList = await getGroupListService({pageSize, pageNum, name})

  // ctx.body = {count: groupInfo.count, list: groupInfo.rows}
  ctx.body ={login: 'succ'}
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

module.exports = {
  loginApi,
  loginCodeApi,
}

