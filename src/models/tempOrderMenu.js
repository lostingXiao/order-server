
const baseTable='temp_order_menu'
const sql = {
  add:(goodsId, tableQrcodeId)=>`INSERT INTO ${baseTable} ( goods_id, table_qrcode_id ) VALUES ( ${goodsId}, ${tableQrcodeId} )`,
  delFirst:( goodsId, tableQrcodeId )=>`DELETE FROM temp_order_menu ${baseTable} WHERE goods_id = ${goodsId} AND table_qrcode_id = ${tableQrcodeId} LIMIT 1`,
  listBytableQrcodeId:( tableQrcodeId )=>{
    return ` SELECT g.*, temp.quantity FROM goods g left join 
      ( select COUNT(id) quantity ,tem.goods_id ,table_qrcode_id from ${baseTable} tem group by table_qrcode_id ,goods_id ) 
      temp on g.id = temp.goods_id 
      where temp.quantity > 0 
      and temp.table_qrcode_id = ${tableQrcodeId} 
      ORDER BY g.updated_at DESC
    `
  },
  delAll:(tableQrcodeId)=>`DELETE FROM temp_order_menu ${baseTable} WHERE table_qrcode_id = ${tableQrcodeId}`,
}

module.exports = sql
