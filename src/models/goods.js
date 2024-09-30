const { formatFilterSql } = require('../utils/util')
const baseTable='goods'
const sql = {
  total:({ name,state,shopId,typeId })=> {
    const base=`SELECT COUNT(*) AS total FROM ${baseTable} `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'state',value:state },
      {key:'shop_id',value:shopId },
      {key:'type_id',value:typeId }
    ]
    const psql = formatFilterSql(arr)
    const sql = base+psql
    return sql
  },
  list:({ name,state,shopId,typeId,pageNum,pageSize })=>{
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
        ${baseTable} g
      LEFT JOIN 
        shop s ON g.shop_id = s.id
      LEFT JOIN 
        goods_type t ON g.type_id = t.id
    `
    const arr=[
      {key:'g.name',value:name,type:'like'},
      {key:'g.state',value:state },
      {key:'g.shop_id',value:shopId },
      {key:'g.type_id',value:typeId }
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY g.updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    const sql = base+psql+page
    return sql
  },

  add:({ description, shopId, typeId, img, minQuantity, name, price, state })=>{
    const _description = description ? `'${description}'` : null
    return `
      INSERT INTO 
        ${baseTable} ( description, shop_id, type_id, img, min_quantity, name, price, state ) 
      VALUES 
        (
          ${_description}, 
          ${shopId}, 
          ${typeId}, 
          '${img}', 
          '${minQuantity}', 
          '${name}', 
          '${price}', 
          '${state}' 
        )
    `
  },
  detail:(id)=>`SELECT * FROM goods WHERE id = ${id}`,
  edit:({ id, description, shopId, typeId, img, minQuantity, name, price, state })=>{
    const _description = description ? `'${description}'` : null
    return `
      UPDATE ${baseTable} SET 
        description = ${_description}, 
        shop_id = ${shopId}, 
        type_id = ${typeId}, 
        img = '${img}', 
        min_quantity = '${minQuantity}', 
        name = '${name}', 
        price = '${price}', 
        state = '${state}' 
      WHERE 
        id = ${id}
    `
  }
}

module.exports = sql





