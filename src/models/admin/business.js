const { formatFilterSql } = require('../../utils/util')

const shop = {
  all:()=> `SELECT * FROM user`,
  list:({ name,pageNum,pageSize })=>{
    console.log('list:({ name,pageNum,pageSize })')
    const base=`SELECT * FROM user `
    const arr=[
      {key:'name',value:name,type:'like'},
    ]
    const psql = formatFilterSql(arr)
    const page=`ORDER BY updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    const sql = base+psql+page
    return sql
  },
  count:({name})=>{
    console.log('count:({name})=>{')
    const base=`SELECT COUNT(*) FROM user `
    const arr=[
      {key:'name',value:name,type:'like'},
    ]
    const psql = formatFilterSql(arr)
    const sql = base+psql
    return sql
  },
  add:({ address,contactPerson,contactPhone,description,name,logoUrl })=>{
    return `INSERT INTO user ( address, contact_Person, contact_Phone, description, name, logo_Url  ) VALUES ('${address}','${contactPerson}','${contactPhone}','${description}','${name}','${logoUrl}' )`
  },
}

module.exports={
  shop,
}