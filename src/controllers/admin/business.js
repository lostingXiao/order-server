
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
} = require('../../services/admin/business')
const { FIXED_KEY } = require('../../config/constant')
const { encrypt,decrypt } = require('../../utils/util')

const { serverDomain  } = FIXED_KEY

//店铺列表
const shopListApi = async (ctx, next) => {
  try{
    const { name=null,pageNum,pageSize } = ctx.request.body
    const total = await getShopTotalService({ name })
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
    const res = await shopDetailByIdService(id)
    ctx.body={ ...res }
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

//商品列表
const goodsListApi = async (ctx, next) => {
  try{
    const { name=null,state=null,shopId=null,typeId=null,pageNum,pageSize } = ctx.request.body
    const total = await getGoodsTotalService({ name,state,shopId,typeId })
    const list = await getGoodsListService({ name,state,shopId,typeId,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}

const addGoodsApi = async (ctx, next) => {
  try{
    const { description=null, shopId=null, typeId=null, img, minQuantity, name, price, state } = ctx.request.body
    await addGoodsService({ description, shopId, typeId, img, minQuantity, name, price, state })
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
    ctx.body={ ...res }
  }catch(err){
    throw err
  }
  return next()
}

const editGoodsApi = async (ctx, next) => {
  try{
    const { id, description=null, shopId=null, typeId=null, img, minQuantity, name, price, state } = ctx.request.body
    await editGoodsService({ id, description, shopId, typeId, img, minQuantity, name, price, state })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

//商品类型
const goodsTypesListApi = async (ctx, next) => {
  try{
    const { name=null,shopId=null,pageNum,pageSize } = ctx.request.body
    const total = await getGoodsTypesTotalService({ name,shopId })
    const list = await getGoodsTypesListService({ name,shopId,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}

const addGoodsTypeApi = async (ctx, next) => {
  try{
    const { name,shopId=null,description=null } = ctx.request.body
    await addGoodsTypeService({ name,shopId,description })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

const goodsTypeDetailApi = async (ctx, next) => {
  try{
    const { id } = ctx.request.body
    const res = await goodsTypeDetailByIdService(id)
    ctx.body={ ...res }
  }catch(err){
    throw err
  }
  return next()
}

const editGoodsTypeApi = async (ctx, next) => {
  try{
    const { id,name,shopId=null, description=null } = ctx.request.body
    await editGoodsTypeService({ id, name, shopId, description })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

const shopGoodsTypesApi = async (ctx, next) => {
  try{
    const { shopId } = ctx.request.body
    const list = await goodsTypesByShopIdService({ shopId })
    ctx.body={ list }
  }catch(err){
    throw err
  }
  return next()
}

// 餐桌二维码
const addTableQrcodeApi = async (ctx, next) => {
  try{
    const { name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat } = ctx.request.body
    const res = await addTableQrcodeService({ name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat })
    ctx.body=res
  }catch(err){
    throw err
  }
  return next()
}

const tableQrcodesListApi = async (ctx, next) => {
  try{
    const { shopId } = ctx.request.body
    const list = await tableQrcodesListService({ shopId })
    ctx.body={ list }
  }catch(err){
    throw err
  }
  return next()
}

const editTableQrcodeApi = async (ctx, next) => {
  try{
    const { id, name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat } = ctx.request.body
    await editTableQrcodeService({ id, name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

const batchTableQrcodeApi = async (ctx, next) => {
  try{
    const { tables } = ctx.request.body
    batchTableQrcodeService(tables)
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

const tableQrcodeUrlApi = async (ctx, next) => {
  try{
    const { code } = ctx.request.body
    const url = await tableQrcodeUrlService(code)
    ctx.body={url}
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
  editGoodsApi,
  goodsTypesListApi,
  addGoodsTypeApi,
  goodsTypeDetailApi,
  editGoodsTypeApi,
  shopGoodsTypesApi,
  addTableQrcodeApi,
  tableQrcodesListApi,
  editTableQrcodeApi,
  batchTableQrcodeApi,
  tableQrcodeUrlApi
}
