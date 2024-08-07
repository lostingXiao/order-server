// 环境变量配置
const dotenv = require('dotenv');
const ENV = process.env.NODE_ENV

dotenv.config();
// mysql配置
const DATABASE = {
  // 本地环境
  development: {
    dbName: "xxx",
    user: "root",
    password: "xxx",
    host: "xxx",
    port: 3306,
  },

  // 阿里云
  production: {
    dbName: "xxx",
    user: "root",
    password: "xxx",
    host: "xxx",
    port: 3306,
  },
};

// jsonwebtoken-jwt配置
const JWT = {
  secret: "xxx", //密钥
  expires: 60 * 60 * 24 * 30, // 30天
};

// 全局参数
const FIXED_KEY = {
  port: process.env.PORT,
  staticDomain:ENV==='development'?`http://localhost:${process.env.PORT}`:`http://www.xiao.com`
}

module.exports={
  DATABASE,
  JWT,
  FIXED_KEY,
}