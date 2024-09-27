const { formatFilterSql } = require('../utils/util')

const auth = {
  all:()=> `SELECT * FROM auth`,
  list:({name,code,pageNum,pageSize})=>{
    const base=`SELECT * FROM auth `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'code',value:code}
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    const sql = base+psql+page
    return sql
  },
  add:({ name,code })=>{
    return `INSERT INTO auth ( name, code ) VALUES ('${name}','${code}' )`
  },
  total:({name,code})=>{
    const base=`SELECT COUNT(*) AS total FROM auth `
    const arr=[
      {key:'name',value:name,type:'like'},
      {key:'code',value:code}
    ]
    const psql = formatFilterSql(arr)
    const sql = base+psql
    return sql
  },
  // edit:({name,path,id})=> `UPDATE menu SET name = '${name}', path = '${path}' WHERE id = ${id}`,
  // del:(id)=>`DELETE FROM menu WHERE id = ${id} OR parent_id = ${id}`
}

module.exports = auth