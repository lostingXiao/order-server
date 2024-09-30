const { 
  goodsListByTableIdService,
} = require('../../services/app/order')

console.log('../../services/app/order')


//商品菜单列表
const goodsListApi = async (ctx, next) => {
  try{
    console.log('goodsListApi-----')
    const tableId = ctx.tableId
    console.log(tableId)
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