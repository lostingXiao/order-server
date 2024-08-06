const { formatFilterSql } = require('../../utils/util')

const menu = {
  all:()=>`WITH RECURSIVE tree AS (
    SELECT id, name, path, parent_id, created_at, updated_at
    FROM menu
    WHERE parent_id IS NULL
    UNION ALL
    SELECT m.id, m.name, m.path, m.parent_id, m.created_at, m.updated_at
    FROM menu m
    JOIN tree t ON m.parent_id = t.id
  )
  SELECT * FROM tree`,
  add:({name,path,parentId})=>{
    return `INSERT INTO menu ( name, path, parent_id) VALUES ('${name}','${path}',${parentId})`
  },
  count:()=> `SELECT COUNT(*) FROM menu`,
  edit:({name,path,id})=> `UPDATE menu SET name = '${name}', path = '${path}' WHERE id = ${id}`,
  del:(id)=>`DELETE FROM menu WHERE id = ${id} OR parent_id = ${id}`
}

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
  count:({name,code})=>{
    const base=`SELECT COUNT(*) FROM auth `
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
  // edit:({name,path,id})=> `UPDATE role SET name = '${name}', path = '${path}' WHERE id = ${id}`,
  // del:(id)=>`DELETE FROM role WHERE id = ${id} OR parent_id = ${id}`
}

const user = {
  all:()=> `SELECT * FROM user`,
  list:({ username,phone,pageNum,pageSize })=>{
    const base=`SELECT * FROM user `
    const arr=[
      {key:'username',value:username,type:'like'},
      {key:'phone',value:phone}
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
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
    return `INSERT INTO user ( username, password, phone, role_id, shop_id  ) VALUES ('${username}','${password}','${phone}','${roleId}','${shopId}' )`
  },
}


module.exports={
  menu,
  auth,
  role,
  user
}