
const menu = {
  all:()=> `SELECT * FROM menu`,
  add:({name,path,parentId})=>{
    return `INSERT INTO menu ( name, path, parent_id) VALUES ('${name}','${path}',${parentId})`
  },
  count:()=> `SELECT COUNT(*) FROM menu`,
  edit:({name,path,id})=> `UPDATE menu SET name = '${name}', path = '${path}' WHERE id = ${id}`,
  del:(id)=>`DELETE FROM menu WHERE id = ${id}`

}

module.exports={
  menu
}