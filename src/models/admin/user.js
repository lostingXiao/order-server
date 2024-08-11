const { formatFilterSql } = require('../../utils/util')
const user = {
  all:()=> `SELECT * FROM user`,
  id:({ username,password })=>{
    const sql = `SELECT id FROM user WHERE username = '${username}' AND password = '${password}' `
    console.log('sql------------------')
    console.log(sql)
    return sql
  },
  list:({ username,phone,pageNum,pageSize })=>{
    const base=`
      SELECT 
        u.id,
        u.username,
        u.phone,
        u.created_at,
        r.name AS role_name,
        s.name AS shop_name
      FROM 
        user u
      JOIN 
        role r ON u.role_id = r.id
      LEFT JOIN 
        shop s ON u.shop_id = s.id 
    `
    const arr=[
      {key:'u.username',value:username,type:'like'},
      {key:'u.phone',value:phone}
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY u.updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    const sql = base+psql+page
    return sql
  },
  count:({username,phone})=>{
    const base=`SELECT COUNT(*) FROM user `
    const arr=[
      {key:'username',value:username,type:'like'},
      {key:'phone',value:phone}
    ]
    const psql = formatFilterSql(arr)
    const sql = base+psql
    return sql
  },
  add:({ username,password,phone,roleId,shopId })=>{
    return `INSERT INTO user ( username, password, phone, role_id, shop_id  ) VALUES ('${username}','${password}','${phone}',${roleId},${shopId} )`
  },
  info:(id)=>{
    const sql=`
      SELECT 
        u.username,
        u.phone,
        u.shop_id,
        r.name AS role_name,
        r.permissions AS role_permissions,
        s.name AS shop_name,
        s.logo_url AS shop_logo_url
      FROM 
        user u
      JOIN 
        role r ON u.role_id = r.id
      LEFT JOIN 
        shop s ON u.shop_id = s.id 
      WHERE u.id = ${id}
    `
    return sql
  }
}

module.exports = user