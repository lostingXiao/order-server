const { 
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
} = require('../../services/admin/business')

//店铺列表
const shopListApi = async (ctx, next) => {
  try{
    const { name=null,pageNum,pageSize } = ctx.request.body
    const res = await getShopTotalService({ name })
    const { total } = res[0]
    const list = await getShopListService({ name,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}

//添加店铺
const addShopApi = async (ctx, next) => {
  try{
    const { address,contactPerson,contactPhone,description=null,name,logoUrl } = ctx.request.body
    await addShopService({ address,contactPerson,contactPhone,description,name,logoUrl })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}
//店铺总数
const shopAllApi = async (ctx, next) => {
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

//店铺列表
const goodsListApi = async (ctx, next) => {
  try{
    const { name=null,state=null,pageNum,pageSize } = ctx.request.body
    const res = await getGoodsTotalService({ name,state })
    const { total } = res[0]
    const list = await getGoodsListService({ name,state,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}

const addGoodsApi = async (ctx, next) => {
  try{
    const { description=null, shopId=null, img, minQuantity, name, price, state } = ctx.request.body
    await addGoodsService({ description, shopId, img, minQuantity, name, price, state })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

const goodsDetailApi = async (ctx, next) => {
  try{
    const { id } = ctx.request.body
    const res = await goodsDetailService(id)
    ctx.body={ ...res[0] }
  }catch(err){
    throw err
  }
  return next()
}

const editGoodsApi = async (ctx, next) => {
  try{
    const { id, description=null, shopId=null, img, minQuantity, name, price, state } = ctx.request.body
    await editGoodsService({ id, description, shopId, img, minQuantity, name, price, state })
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
  editShopApi,
  goodsListApi,
  addGoodsApi,
  goodsDetailApi,
  editGoodsApi
}
