const mysql =require('mysql')
const { DATABASE } = require('../config/constant')

const pool = mysql.createPool(DATABASE)
const query = (sql,values)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,connecttion)=>{
      if(err){
        reject(err)
      }else{
        connecttion.query(sql,values,(err,rows)=>{
          if(err){
            reject(err)
          }else{
            resolve(rows)
          }
          connecttion.release()
        })
      }
    })
  })
}

module.exports=query