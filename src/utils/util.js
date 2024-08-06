
const JWT = require('../config/constant')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

/*获取当前ip地址*/

const getIpAddress = () => {
  const interfaces = require('os').networkInterfaces()
  for (const devName in interfaces) {
    const temp = interfaces[devName]
    for (let i = 0; i < temp.length; i++) {
      const alias = temp[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

// 获取客户端ip地址

const getClientIpAddress = (ctx) => {
  const headers = ctx.headers
  if (headers['x-forwarded-for']) {
    const ipList = headers['x-forwarded-for'].split(',')
    return ipList[0]
  }
  return '0.0.0.0'
}

// 通过token解析userId

const decodeToken = (token) => {
  let jwtInfo = jwt.verify(token, JWT.secret)
  try {
    return jwtInfo.userId
  } catch (err) {
    return 'token不合法'
  }
}

// 根据userId生成token
const generatorToken = (userId) => {
  return jwt.sign({ userId }, JWT.secret, { expiresIn: JWT.expires })
}


// 格式化查询参数
const formatFilterSql = (arr) => {
  let first=true
  let sql=''
  arr.forEach(item => {
    if(item.value){
      const s1=`${first?' WHERE ':' AND '}`
      const s2=item.type==='like'?`${item.key} LIKE '%${item.value}%' `:`${item.key} = '${item.value}' `
      const s=s1+s2
      sql+=s
      first=false
    }
  });
  return sql
}


// 随机密钥
const randomKey = (arr) => {
  const randomBytes = crypto.randomBytes(8); // 生成8个字节（64位）的随机数
  return randomBytes.toString('hex');
}

module.exports={
  getIpAddress,
  getClientIpAddress,
  decodeToken,
  generatorToken,
  formatFilterSql,
  randomKey
}