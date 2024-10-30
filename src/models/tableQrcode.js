const baseTable='table_qrcode'
const sql = {
  listByShopId:({ shopId })=>{
    return `SELECT * FROM ${baseTable} WHERE shop_id = ${shopId} ORDER BY id`
  },
  goodsListByShopId:(shopId)=>{
    const base=`
    SELECT 
      g.id,
      g.description,
      g.shop_id,
      g.type_id,
      g.img,
      g.min_quantity,
      g.name,
      g.state,
      g.price,
      g.created_at,
      g.updated_at,
      t.name AS type_name
    FROM 
      goods g
    LEFT JOIN 
      shop s ON g.shop_id = s.id
    LEFT JOIN 
      goods_type t ON g.type_id = t.id
    WHERE
      g.shop_id = ${shopId}
  `
  return base
    // return `SELECT * FROM goods WHERE shop_id = ${shopId} ORDER BY id`
  },
  add:({ name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat })=>{
    return `INSERT INTO ${baseTable} ( name, shop_id, qr_code_bg_color, qr_code_color, qr_code_icon, qr_code_size, seat ) VALUES ('${name}', ${shopId},'${qrCodeBgColor}', '${qrCodeColor}', ${qrCodeIcon}, ${qrCodeSize}, ${seat})`
  },
  edit:({ id, name, shopId, qrCodeBgColor, qrCodeColor, qrCodeIcon, qrCodeSize, seat })=> {
    return `UPDATE ${baseTable} 
      SET name = '${name}', 
      shop_id = ${shopId}, 
      qr_code_bg_color = '${qrCodeBgColor}', 
      qr_code_color = '${qrCodeColor}', 
      qr_code_icon = '${qrCodeIcon}', 
      qr_code_size = '${qrCodeSize}', 
      seat = '${seat}' 
      WHERE id = ${id}`
  },
  shopIdByTableId: (tableId) => {
    return `SELECT shop_id FROM ${baseTable} WHERE id = ${tableId}`
  }
}

module.exports = sql
