const { formatFilterSql } = require('../utils/util')
const baseTable='order_details'
const sql = {
  add:(list)=>{
    const base=`INSERT INTO ${baseTable} (goods_id, order_id, quantity, amount, status) VALUES `
    let values = ''
    const l = list.length - 1
    list.forEach((item,index) => {
      const { goods_id, order_id, quantity, amount, status } = item
      values+=`(${goods_id}, ${order_id}, ${quantity}, ${amount}, ${status})${index<l?',':''} `
    })
    const sql = base+values
    return sql
  },
  listByOrderId:(orderId)=>`SELECT * FROM ${baseTable} WHERE order_id = ${orderId}`,
  editStatus:({ orderId,id,status })=> `UPDATE ${baseTable} SET status = ${status} WHERE order_id = ${orderId} AND id = ${id}`,
  editStatusByOrderId:({orderId,status})=> `UPDATE ${baseTable} SET status = ${status} WHERE order_id = ${orderId}`,
  detailCount:(orderId)=>`SELECT COUNT(*) AS count FROM ${baseTable} WHERE order_id = ${orderId} and status != 4`,
}

module.exports = sql
