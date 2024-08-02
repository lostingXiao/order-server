// import {getGroupInfoService, getGroupListService} from "../../services/admin/shop";

//店铺列表
const shopListApi = async (ctx, next) => {
  let {pageSize = 10, pageNum = 1, name=''} = (ctx.request.query || {}) 
  // offset = Number(offset)
  // limit = Number(limit)

  // 获取列表
  // const shopList = await getGroupListService({pageSize, pageNum, name})

  // ctx.body = {count: groupInfo.count, list: groupInfo.rows}
  ctx.body ={count: '100'}
  return next()
}

module.exports = {
  shopListApi
}
