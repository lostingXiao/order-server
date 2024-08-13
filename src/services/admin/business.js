const query =require('../../utils/query')
const shop = require('../../models/admin/shop')
const goods = require('../../models/admin/goods')


// 添加店铺
const addShopService = async ({address,contactPerson,contactPhone,description,name,logoUrl}) => {
  const result=await query(shop.add({ address,contactPerson,contactPhone,description,name,logoUrl }))
  return result
}

const getShopTotalService = async ({name})=>{
  const result=await query(shop.total({ name }))
  return result
} 
const getShopListService = async ({ name,pageNum,pageSize })=>{
  const result=await query(shop.list({ name,pageNum,pageSize }))
  return result
}

const shopAllService = async ()=>{
  const result=await query(shop.all())
  return result
}

const shopDetailByIdService = async (id)=>{
  const result=await query(shop.detail(id))
  return result
}

const editShopByIdService = async ({id,address,contactPerson,contactPhone,description,name,logoUrl})=>{
  const result=await query(shop.edit({id,address,contactPerson,contactPhone,description,name,logoUrl}))
  return result
}

const getGoodsTotalService = async ({ name,state })=>{
  const result=await query(goods.total({ name,state }))
  return result
}

const getGoodsListService = async ({ name,state,pageNum,pageSize })=>{
  const result=await query(goods.list({ name,state,pageNum,pageSize }))
  return result
}

const addGoodsService = async ({ description, shopId, img, minQuantity, name, price, state })=>{
  const result=await query(goods.add({ description, shopId, img, minQuantity, name, price, state }))
  return result
}

const goodsDetailService = async (id)=>{
  const result=await query(goods.detail(id))
  return result
}

const editGoodsService = async ({ id, description, shopId, img, minQuantity, name, price, state })=>{
  const result=await query(goods.edit({ id, description, shopId, img, minQuantity, name, price, state }))
  return result
}


module.exports = {
  addShopService,
  getShopTotalService,
  getShopListService,
  shopAllService,
  shopDetailByIdService,
  editShopByIdService,
  getGoodsTotalService,
  getGoodsListService,
  addGoodsService,
  goodsDetailService, 
  editGoodsService
}