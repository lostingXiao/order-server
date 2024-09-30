const baseTable='table_qrcode'
const sql = {
  listByShopId:({ shopId })=>{
    return `SELECT * FROM ${baseTable} WHERE shop_id = ${shopId} ORDER BY id`
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
  listByTableId: (tableId) => {
    const base=`
      SELECT 
        g.id, 
        g.name, 
        g.price, 
        g.shop_id, 
        g.img, 
        g.min_quantity, 
        g.description, 
        g.state, 
        t.id AS goods_type_id, 
        t.name AS goods_type_name, 
        q.id AS table_qrcode_id, 
        q.name AS table_qrcode_name
      FROM 
        ${baseTable} q
      INNER JOIN 
        goods g ON q.shop_id = g.shop_id
      INNER JOIN 
        goods_type t ON g.type_id = t.id AND g.shop_id = t.shop_id
      WHERE 
        q.id = ${tableId} AND g.state = 1
    `
    return base
  }
}

module.exports = sql
