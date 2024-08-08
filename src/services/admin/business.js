const query =require('../../utils/query')
const { shop }= require('../../models/admin/business')

// 添加店铺
const addShopService = async ({address,contactPerson,contactPhone,description,name,logoUrl}) => {
  const result=await query(shop.add({ address,contactPerson,contactPhone,description,name,logoUrl }))
  return result
}

const getShopCountService = async ({name})=>{
  console.log('getShopCountService')
  const result=await query(shop.count({ name }))
  return result
} 
const getShopListService = async ({ name,pageNum,pageSize })=>{
  console.log('getShopListService')
  const result=await query(shop.list({ name,pageNum,pageSize }))
  return result
}

const shopAllService = async ()=>{
  console.log('shopAllService')
  const result=await query(shop.all())
  console.log(result)
  return result
}

module.exports = {
  addShopService,
  getShopCountService,
  getShopListService,
  shopAllService
}