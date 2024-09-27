const { formatFilterSql } = require('../utils/util')
const baseTable='goods_type'
const sql = {
  list:({name,shopId,pageNum,pageSize})=>{
    const base=`
      SELECT 
        t.id,
        t.name,
        t.created_at,
        t.updated_at,
        s.id AS shop_id,
        s.name AS shop_name
      FROM 
        ${baseTable} t
      JOIN 
        shop s ON t.shop_id = s.id
     `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'shop_id',value:shopId },
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY t.updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    const sql = base+psql+page
    return sql
  },
  listByShopId:({ shopId })=>{
    return `SELECT * FROM ${baseTable} WHERE shop_id = ${shopId}`
  },
  add:({ name, shopId, description })=>{
    const _description = description=null ? `'${description}'` : null
    return `INSERT INTO ${baseTable} ( name, shop_id, description ) VALUES ('${name}', ${shopId}, ${_description})`
  },
  total:({name, shopId})=>{
    const base=`SELECT COUNT(*) AS total FROM ${baseTable} `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'shop_id',value:shopId },
    ]
    const psql = formatFilterSql(arr)
    const sql = base+psql
    return sql
  },
  detail:(id)=>`SELECT * FROM ${baseTable} WHERE id = ${id}`,
  edit:({id, name, shopId, description })=> {
    const _description = description ? `'${description}'` : null
    return `UPDATE ${baseTable} SET name = '${name}', shop_id = ${shopId}, description = ${_description} WHERE id = ${id}`
  } 
}

module.exports = sql
