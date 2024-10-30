const query =require('../../utils/query')
const tableQrcode = require('../../models/tableQrcode')
const orders = require('../../models/orders')
const orderDetails = require('../../models/orderDetails')
const tempOrderMenu = require('../../models/tempOrderMenu')
const { orderFormat, removeRedundantByGoodsId } =require('../../utils/util')
const Big = require('big.js')


const { FIXED_KEY } = require('../../config/constant')
const { serverDomain, appDomain  } = FIXED_KEY

// 获取当前餐桌归属店铺商品
const goodsListByTableIdService = async (tableId) => {
  const shopIdRes=await query(tableQrcode.shopIdByTableId(tableId))
  const shopId = shopIdRes[0].shop_id
  const goodsList=await query(tableQrcode.goodsListByShopId(shopId))
  const obj = {}
  goodsList.forEach(item => {
    const { type_id, img, ...rest } = item
    const o = { type_id , img_url: serverDomain+img, ...rest  }
    if(!obj[type_id]){
      obj[type_id]={ ...rest, goodsList:[]  }
    }
    obj[type_id].goodsList.push(o)
  })
  const result = Object.entries(obj).map(item=>{
    const { type_name, goodsList } = item[1]
    return { type_name, type_id: parseInt(item[0]), goodsList }
  })
  return result
}

// 添加点单
const addGoodsByTableIdService = async (tableId,goodsId) => {
  const result = await query(tempOrderMenu.add(goodsId, tableId ))
  return result
}

// 删除点单
const deleteFirstGoodsByIdService = async (tableId,goodsId) => {
  const result = await query(tempOrderMenu.delFirst( goodsId, tableId ))
  return result
}

// 获取当前客户点单
const orderGoodsListByTableIdService = async (tableId) => {
  const tempList = await query(tempOrderMenu.listBytableQrcodeId( tableId ))
  const list = tempList.map(item=>{
    const { img, price, quantity, ...rest } = item
    return { amount: parseFloat(Big(price * quantity).toFixed(2)), price, quantity, img_url: serverDomain+img, ...rest  }
  })
  const totalObj = list.reduce((total, item)=>{
    total.amount+=item.amount
    total.quantity+=item.quantity
    return total
  },{ amount:0, quantity:0 }) 
  const amount=parseFloat(Big(totalObj.amount).toFixed(2))
  const quantity= parseInt(Big(totalObj.quantity))
  return { amount, quantity, list}
}
// 根据客户所点商品添加订单
const addOrderService = async ( tableId ) => {
  const orderGoods = await orderGoodsListByTableIdService(tableId)
  const { amount, quantity, list} = orderGoods
  const addRes = await query(orders.add( { tableQrcodeId:tableId, status:0, quantity, amount } ))
  const order_id = addRes.insertId
  const detailList = list.map(item=>{
    const { id, quantity, amount } = item
    return { goods_id:id, order_id, quantity, amount, status:0  }
  })
  await query(orderDetails.add( detailList ))
  const result = await query(tempOrderMenu.delAll( tableId ))
  return result
}

const orderListService = async ( tableId ) => {
  const result = await query(orders.list( tableId ))
  const map = new Map()
  for(let item of result){
    const { order_id, order_quantity, order_status, order_amount, order_updated_at, table_qrcode_id,...rest } = item
    const obj = { order_id, order_quantity, order_status, order_amount, order_updated_at, table_qrcode_id }
    if(map.has(order_id)){
      map.get(order_id).detailList.push({order_id,...rest})
    }else{
      map.set(order_id, { detailList: [{order_id,...rest}], ...obj})
    }
  }
  const list = Array.from(map.values())
  const totalObj = list.reduce((total, item)=>{
    total.amount+=item.order_amount
    total.quantity+=item.order_quantity
    return total
  },{ amount:0, quantity:0 })
  const amount=parseFloat(Big(totalObj.amount).toFixed(2))
  const quantity= parseInt(Big(totalObj.quantity))
  return { amount, quantity, list}
}

const orderCancelService = async ( tableId, id ) => {
  const result = await query(orders.editStatus({tableId,id,status:4}))
  return result
}

const orderDetailCanceByOrderIdService = async (orderId) => {
  const result = await query(orderDetails.editStatusByOrderId({orderId,status:4}))
  return result
}

const orderDetailCancelService = async ( orderId, id ) => {
  const result = await query(orderDetails.editStatus({orderId,id,status:4}))
  return result
}

const detailCountByOrderIdService= async ( orderId ) => {
  const result = await query(orderDetails.detailCount(orderId))
  return result
}

module.exports = {
  goodsListByTableIdService,
  addGoodsByTableIdService,
  orderGoodsListByTableIdService,
  deleteFirstGoodsByIdService,
  addOrderService,
  orderListService,
  orderCancelService,
  orderDetailCancelService,
  orderDetailCanceByOrderIdService,
  detailCountByOrderIdService
}
