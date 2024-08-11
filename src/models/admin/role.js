const { formatFilterSql } = require('../../utils/util')
const role = {
  all:()=> `SELECT * FROM role`,
  list:({name,keyword,pageNum,pageSize})=>{
    const base=`SELECT * FROM role `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'keyword',value:keyword}
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    const sql = base+psql+page
    return sql
  },
  add:({ name,keyword,permissions:pers,menus:mes })=>{
    const permissions=JSON.stringify(pers)
    const menus=JSON.stringify(mes)
    return `INSERT INTO role ( name, keyword, permissions, menus  ) VALUES ('${name}','${keyword}','${permissions}','${menus}' )`
  },
  count:({name,keyword})=>{
    const base=`SELECT COUNT(*) FROM role `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'keyword',value:keyword}
    ]
    const psql = formatFilterSql(arr)
    const sql = base+psql
    return sql
  },
  id:(id)=> `SELECT * FROM role WHERE id = ${id}`,
  edit:({ id,name,permissions,menus })=> `UPDATE role SET name = '${name}', permissions = '${permissions}',menus = '${menus}' WHERE id = ${id}`,
  del:(id)=>`DELETE FROM role WHERE id = ${id} OR parent_id = ${id}`
}

module.exports = role