const { formatFilterSql } = require('../../utils/util')
const { list } = require('./shop')
const { add } = require('./user')
const goods = {
  total:({ name,state })=> {
    const base=`SELECT COUNT(*) AS total FROM goods `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'state',value:state }
    ]
    const psql = formatFilterSql(arr)
    const sql = base+psql
    return sql
  },
  list:({ name,state,shopId,pageNum,pageSize })=>{
    const base=`SELECT * FROM goods `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'state',value:state },
      {key:'shop_id',value:shopId }
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    const sql = base+psql+page
    return sql
  },
  add:({ description, shopId, img, minQuantity, name, price, state })=>{
    return `
      INSERT INTO 
        goods ( description, shop_id, img, min_quantity, name, price, state ) 
      VALUES 
        (
          '${description}', 
          '${shopId}', 
          '${img}', 
          '${minQuantity}', 
          '${name}', 
          '${price}', 
          '${state}' 
        )
    `
  },
  detail:(id)=>`SELECT * FROM goods WHERE id = ${id}`,
  edit:({ id, description, shopId, img, minQuantity, name, price, state })=>{
    return `
      UPDATE goods SET 
        description = '${description}', 
        shop_id = '${shopId}', 
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


module.exports = goods