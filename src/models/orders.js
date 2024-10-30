const baseTable='orders'
const sql = {
  add:({ tableQrcodeId,status,quantity,amount })=>`INSERT INTO ${baseTable} ( table_qrcode_id, status, quantity, amount ) VALUES (${tableQrcodeId},${status},${quantity},${amount} )`,
  editStatus:({ id, tableId, status })=> `UPDATE ${baseTable} SET status = ${status} WHERE table_qrcode_id = ${tableId} AND id = ${id}`,
  orderIdByTableId:(tableId)=>`SELECT id FROM ${baseTable} WHERE table_qrcode_id = ${tableId} AND status = 0`,
  list:(tableId) => {
    console.log(tableId)
    const base =`
      SELECT 
        o.table_qrcode_id, 
        o.status AS order_status,
        o.quantity AS order_quantity, 
        o.amount AS order_amount,
        o.updated_at AS order_updated_at,
        od.*,
        g.name AS goods_name,
        g.price AS goods_price
      FROM
        ${baseTable} o
      JOIN
        order_details od ON o.id = od.order_id
      JOIN
        goods g ON od.goods_id = g.id 
      WHERE
        o.table_qrcode_id = ${tableId}
      AND
        o.status IN (0, 1, 2)
      AND
        od.status IN (0, 1, 2)
      ORDER BY
        od.updated_at
      DESC
    `
    return base
  }
  
}

module.exports = sql

// ORDER BY updated_at DESC;
// SELECT 
//         o.table_qrcode_id, 
//         o.status AS order_status,
//         o.quantity AS order_quantity, 
//         o.amount AS order_amount,
//         od.*,
//         g.name AS goods_name,
//         g.price AS goods_price
//       FROM
//       orders o
//       JOIN
//         order_details od ON o.id = od.order_id
//       JOIN
//         goods g ON od.goods_id = g.id 
//       WHERE
//         o.table_qrcode_id = 6
//       AND
//         o.status IN (0, 1, 2)