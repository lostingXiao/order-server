const query =require('../../utils/query')
const shop = require('../../models/shop')
const goods = require('../../models/goods')
const goodsType = require('../../models/goodsType')
const tableQrcode = require('../../models/tableQrcode')

const { FIXED_KEY } = require('../../config/constant')
const { serverDomain,appDomain  } = FIXED_KEY
const { encrypt,decrypt } = require('../../utils/util')


// 添加店铺
const addShopService = async ({address,contactPerson,contactPhone,description,name,logoUrl}) => {
  const result=await query(shop.add({ address,contactPerson,contactPhone,description,name,logoUrl }))
  return result
}

const getShopTotalService = async ({name})=>{
  const list=await query(shop.total({ name }))
  const result = list[0]
  return result
} 
const getShopListService = async ({ name,pageNum,pageSize })=>{
  const result=await query(shop.list({ name,pageNum,pageSize }))
  return result
}

const shopAllService = async ()=>{
  const list=await query(shop.all())
  const result = list.map(item=>({...item,logo_url:serverDomain+item.logo_url}))
  return result
}

const shopDetailByIdService = async (id)=>{
  const list=await query(shop.detail(id))
  const result = { ...list[0],logo_url: serverDomain+list[0].logo_url}
  return result
}

const editShopByIdService = async ({id,address,contactPerson,contactPhone,description,name,logoUrl})=>{
  const result=await query(shop.edit({id,address,contactPerson,contactPhone,description,name,logoUrl}))
  return result
}

const getGoodsTotalService = async ({ name,state,shopId,typeId })=>{
  const list=await query(goods.total({ name,state,shopId,typeId }))
  const result = list[0]
  return result
}

const getGoodsListService = async ({ name,state,shopId,typeId,pageNum,pageSize })=>{
  const list=await query(goods.list({ name,state,shopId,typeId,pageNum,pageSize }))
  const result = list.map(item=>({...item, img: serverDomain+item.img, state_name:item.state?'上架':'下架'}))
  return result
}

const addGoodsService = async ({ description, shopId, typeId, img, minQuantity, name, price, state })=>{
  const result=await query(goods.add({ description, shopId, typeId, img, minQuantity, name, price, state }))
  return result
}

const goodsDetailService = async (id)=>{
  const list=await query(goods.detail(id))
  const result = list[0]
  return result
}

const editGoodsService = async ({ id, description, shopId, typeId, img, minQuantity, name, price, state })=>{
  const result=await query(goods.edit({ id, description, shopId, typeId, img, minQuantity, name, price, state }))
  return result
}

// 商品类型
const getGoodsTypesTotalService =async ({ name,shopId })=>{
  const list=await query(goodsType.total({ name,shopId }))
  const result = list[0]
  return result
}

const getGoodsTypesListService = async ({ name,shopId,pageNum,pageSize })=>{
  const result=await query(goodsType.list({ name,shopId,pageNum,pageSize }))
  return result
}

const addGoodsTypeService = async ({ name, shopId, description })=>{
  const result=await query(goodsType.add({ name, shopId, description }))
  return result
}

const goodsTypeDetailByIdService = async (id)=>{
  const list=await query(goodsType.detail(id))
  const result = list[0]
  return result
}
const editGoodsTypeService = async ({ id, name, shopId, description })=>{
  const result=await query(goodsType.edit({ id, name, shopId, description }))
  return result
}
const goodsTypesByShopIdService = async ({ shopId })=>{
  const result=await query(goodsType.listByShopId({ shopId }))
  return result
}

//餐桌二维码 
const addTableQrcodeService = async ({ name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat })=>{
  const res=await query(tableQrcode.add({ name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat }))
  const id = res.insertId
  const content = encrypt(id)
  return { id,content }
}
const tableQrcodesListService = async ({ shopId })=>{
  const list=await query(tableQrcode.listByShopId({ shopId }))
  const result = list.map(item=>({...item,content:encrypt(item.id)}))
  return result
}
const editTableQrcodeService = async ({ id, name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat })=>{
  const result=await query(tableQrcode.edit({ id, name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat }))
  return result
}
const batchTableQrcodeService = (tables)=>{
  tables.forEach(async item=>{
    const { id, ...reset } = item
    if(id){
      await editTableQrcodeService({ id, ...reset })
    }else{
      await addTableQrcodeService({ ...reset })
    }
  })
}
const tableQrcodeUrlService = async (code)=>{
  const res = decrypt(code)
  if(res){
    return appDomain
  }else{
    throw Error('已失效')
  }
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
  editGoodsService,
  getGoodsTypesTotalService,
  getGoodsTypesListService,
  addGoodsTypeService,
  goodsTypeDetailByIdService,
  editGoodsTypeService,
  goodsTypesByShopIdService,
  addTableQrcodeService,
  tableQrcodesListService,
  editTableQrcodeService,
  batchTableQrcodeService,
  tableQrcodeUrlService
}