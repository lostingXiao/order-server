const { 
  goodsListByTableIdService,
} = require('../../services/app/order')


//商品菜单列表
const goodsListApi = async (ctx, next) => {
  try{
    const tableId = ctx.tableId
    const list = await goodsListByTableIdService(tableId)
    ctx.body={ list }
  }catch(err){
    throw err
  }
  return next()
}

module.exports = {
  goodsListApi,
}