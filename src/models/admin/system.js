
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
  list:()=> `SELECT * FROM auth`,
  // list:({name,code,pageNum,pageSize})=>{
  //   return `SELECT * FROM auth WHERE IFNULL(name, '') LIKE '%${name}%' 
  //     ORDER BY updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
  // },
  add:({ name,code })=>{
    return `INSERT INTO auth ( name, code ) VALUES ('${name}','${code}' )`
  },
  count:({name,code})=>{
    return `SELECT COUNT(*) FROM auth WHERE IFNULL(name, '') LIKE '%${name}%' AND ( code = '${code}' OR '${code}' IS NULL)`
  },
  edit:({name,path,id})=> `UPDATE menu SET name = '${name}', path = '${path}' WHERE id = ${id}`,
  del:(id)=>`DELETE FROM menu WHERE id = ${id} OR parent_id = ${id}`
}


module.exports={
  menu,
  auth
}