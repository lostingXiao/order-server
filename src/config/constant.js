// 环境变量配置
const ENV = process.env.NODE_ENV
const dotenv = require('dotenv')
dotenv.config({ path: `.env.${ENV}` })
const serverDomain = process.env.SERVER_DOMAIN
const appDomain = process.env.APP_DOMAIN


// mysql配置
const db = ()=> {
  // 本地环境
  const config = {
    development: {
      user:'root',
      password:'123456',
      port:3306,
      host:'localhost',
      database:'orders_db'
    },
    // 云
    production: {
      dbName: "xxx",
      user: "root",
      password: "xxx",
      host: "xxx",
      port: 3306,
    }
  }
  return config[ENV]
}

const DATABASE = db()

const SECRET = {
  key: 'TXRZ3jThBP2dWnUN', //密钥
  expires: 60 * 60 * 24 * 30, // 有效期 秒为单位
  iv: '2Mr9ca8KFEdAFGua',
}



// 全局参数
const FIXED_KEY = {
  port: process.env.PORT,
  serverDomain,
  appDomain
}

module.exports={
  DATABASE,
  SECRET,
  FIXED_KEY,
}