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
  } 
}

module.exports = sql
