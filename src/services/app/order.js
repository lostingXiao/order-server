const query =require('../../utils/query')
const goods = require('../../models/goods')
const tableQrcode = require('../../models/tableQrcode')
const { FIXED_KEY } = require('../../config/constant')
const { serverDomain, appDomain  } = FIXED_KEY

// 获取当前餐桌归属店铺商品
const goodsListByTableIdService = async (tableId) => {
  const list=await query(tableQrcode.listByTableId(tableId))
  const obj = {}
  list.forEach(item => {
    const { goods_type_id, img, ...rest } = item
    const o = { goods_type_id , img_url: serverDomain+img, ...rest  }
    if(!obj[goods_type_id]){
      obj[goods_type_id]={ ...rest, goodsList:[]  }
    }
    obj[goods_type_id].goodsList.push(o)
  })
  const result = Object.entries(obj).map(item=>{
    const { goods_type_name, goodsList } = item[1]
    return { goods_type_name, goods_type_id: parseInt(item[0]), goodsList }
  })
  return result
}
module.exports = {
  goodsListByTableIdService
}