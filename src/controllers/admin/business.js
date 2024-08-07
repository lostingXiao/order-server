const { 
  addShopService,
  getShopCountService,
  getShopListService
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

//添加菜单
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

module.exports = {
  shopListApi,
  addShopApi
}
