const mysql =require('mysql')
const mysql_connect=require('../config/db')
const pool = mysql.createPool(mysql_connect)
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