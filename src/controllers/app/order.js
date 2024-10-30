const { 
  goodsListByTableIdService,
  addOrderService,
  orderListService
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

//生成订单
const createOrderApi = async (ctx, next) => {
  try{
    const tableId = ctx.tableId
    await addOrderService(tableId)
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}
// 已下单的订单列表
const orderListApi = async (ctx, next) => {
  try{
    const tableId = ctx.tableId
    const res = await orderListService(tableId)
    ctx.body={ ...res }
  }catch(err){
    throw err
  }
  return next()
}




module.exports = {
  goodsListApi,
  createOrderApi,
  orderListApi
}