const { formatFilterSql } = require('../utils/util')

const shop = {
  all:()=> `SELECT * FROM shop`,
  list:({ name,pageNum,pageSize })=>{
    const base=`SELECT * FROM shop `
    const arr=[
      {key:'name',value:name,type:'like'},
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    const sql = base+psql+page
    return sql
  },
  total:({name})=>{
    const base=`SELECT COUNT(*) AS total FROM shop `
    const arr=[
      {key:'name',value:name,type:'like'},
    ]
    const psql = formatFilterSql(arr)
    const sql = base+psql
    return sql
  },
  add:({ address,contactPerson,contactPhone,description,name,logoUrl })=>{
    const _description = description ? `'${description}'` : null
    return `INSERT INTO shop 
      ( address, contact_Person, contact_Phone, description, name, logo_Url  ) 
      VALUES 
      ('${address}','${contactPerson}','${contactPhone}',${_description},'${name}','${logoUrl}' )`
  },
  detail:(id)=>`SELECT * FROM shop WHERE id=${id}`,
  edit:({id,address,contactPerson,contactPhone,description,name,logoUrl})=>{
    const _description = description ? `'${description}'` : null
    return `UPDATE shop SET 
      address='${address}',
      contact_Person='${contactPerson}',
      contact_Phone='${contactPhone}',
      description=${_description},
      name='${name}',
      logo_Url='${logoUrl}' 
      WHERE 
      id=${id}
    `
  }

}

module.exports = shop