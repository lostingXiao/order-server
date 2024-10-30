const { 
  orderGoodsListByTableIdService,
  addGoodsByTableIdService,
  deleteFirstGoodsByIdService,
  orderListService,
  orderCancelService,
  orderDetailCancelService,
  orderDetailCanceByOrderIdService,
  detailCountByOrderIdService
} = require('../../services/app/order')


//scoket添加
const addTempGoodsListApi = async (tableId, data ) => {
  console.log('addTempGoodsListApi')
  try{
    const { id } = data
    console.log(tableId)
    console.log(data)
    await addGoodsByTableIdService(tableId, id)
    const res = await orderGoodsListByTableIdService(tableId)
    return res
  }catch(err){
    throw err
  }
}

//点单减少
const subTempGoodsListApi = async (tableId, data ) => {
  try{
    const { id } = data
    await deleteFirstGoodsByIdService(tableId, id)
    const res = await orderGoodsListByTableIdService(tableId)
    return res
  }catch(err){
    throw err
  }
}

//scoket用户正在下单列表
const tempGoodsListApi = async (tableId) => {
  try{
    const res = await orderGoodsListByTableIdService(tableId)
    return res
  }catch(err){
    throw err
  }
}

//订单列表
const orderListApi = async (tableId) => {
  try{
    const res = await orderListService(tableId)
    return res
  }catch(err){
    throw err
  }
}

//点单减少
const orderCancelApi = async (tableId, data ) => {
  try{
    console.log('orderCancelApi')
    const { id } = data
    await orderCancelService(tableId, id)
    await orderDetailCanceByOrderIdService(id)
    const res = await orderListService(tableId)
    return res
  }catch(err){
    throw err
  }
}

const orderDetailCancelApi = async (tableId, data ) => {
  try{
    console.log('orderDetailCancelApi')
    const { id, orderId } = data
    await orderDetailCancelService(orderId, id)
    const detailCount = await detailCountByOrderIdService(orderId)
    const { count } = detailCount[0]
    console.log(count)
    if(!count) await orderCancelService(tableId, orderId)
    const res = await orderListService(tableId)
    return res
  }catch(err){
    throw err
  }
}

module.exports = {
  addTempGoodsListApi,
  tempGoodsListApi,
  subTempGoodsListApi,
  orderListApi,
  orderCancelApi,
  orderDetailCancelApi
}