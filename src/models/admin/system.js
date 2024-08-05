
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
  all:()=> `SELECT * FROM menu`,
  add:({name,path,parentId})=>{
    return `INSERT INTO menu ( name, path, parent_id) VALUES ('${name}','${path}',${parentId})`
  },
  count:()=> `SELECT COUNT(*) FROM menu`,
  edit:({name,path,id})=> `UPDATE menu SET name = '${name}', path = '${path}' WHERE id = ${id}`,
  del:(id)=>`DELETE FROM menu WHERE id = ${id} OR parent_id = ${id}`
}



module.exports={
  menu,
  auth
}