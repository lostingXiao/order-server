const { 
  addShopService,
  getShopCountService,
  getShopListService,
  shopAllService,
  shopDetailByIdService,
  editShopByIdService
} = require('../../services/admin/business')

//店铺列表
const shopListApi = async (ctx, next) => {
  console.log('shopListApi')
  try{
    const { name=null,pageNum,pageSize } = ctx.request.body
    const count = await getShopCountService({ name })
    const total = count[0]['COUNT(*)']
    const list = await getShopListService({ name,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    console.log('shopListApi------------err')
    console.log(err)
    throw err
  }
  return next()
}

//添加店铺
const addShopApi = async (ctx, next) => {
  console.log('addShopApi');
  try{
    const { address,contactPerson,contactPhone,description=null,name,logoUrl } = ctx.request.body
    const res = await addShopService({ address,contactPerson,contactPhone,description,name,logoUrl })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}
//店铺总数
const shopAllApi = async (ctx, next) => {
  console.log('shopAllApi');
  try{
    const list = await shopAllService()
    ctx.body={list}
  }catch(err){
    throw err
  }
  return next()
}

//店铺详情
const shopDetailApi = async (ctx, next) => {
  try{
    const { id } = ctx.request.body
    const list = await shopDetailByIdService(id)
    ctx.body={ ...list[0] }
  }catch(err){
    throw err
  }
  return next()
}

//店铺修改
const editShopApi = async (ctx, next) => {
  try{
    const { id,address,contactPerson,contactPhone,description=null,name,logoUrl } = ctx.request.body
    await editShopByIdService({id,address,contactPerson,contactPhone,description,name,logoUrl})
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}




module.exports = {
  shopListApi,
  addShopApi,
  shopAllApi,
  shopDetailApi,
  editShopApi
}
