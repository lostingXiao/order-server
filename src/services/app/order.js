const goods = require('../../models/goods')

// 获取当前餐桌归属店铺商品
const goodsListByTableIdService = async (tableId) => {
  const list=await query(goods.listByTableId(tableId))

  console.log('goodsListByTableIdService----')
  console.log(list)

  const result=list[0]
  return result
}

module.exports = {
  goodsListByTableIdService
}