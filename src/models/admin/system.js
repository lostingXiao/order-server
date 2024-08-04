
const menu = {
  all:()=>`
    WITH RECURSIVE menu_tree AS (
      SELECT id, parent_id, name, 0 AS level
      FROM menu
      WHERE parent_id IS NULL
      UNION ALL
      SELECT mi.id, mi.parent_id, mi.name, level + 1
      FROM menu mi
      INNER JOIN menu_tree mt ON mi.parent_id = mt.id
    )
    SELECT * FROM menu_tree;`,




  // all:()=> `SELECT * FROM menu`,
  add:({name,path,parentId})=>{
    return `INSERT INTO menu ( name, path, parent_id) VALUES ('${name}','${path}',${parentId})`
  },
  count:()=> `SELECT COUNT(*) FROM menu`,
  edit:({name,path,id})=> `UPDATE menu SET name = '${name}', path = '${path}' WHERE id = ${id}`,
  del:(id)=>`DELETE FROM menu WHERE id = ${id} OR parent_id = ${id}`
}

module.exports={
  menu
}