
const { SECRET } = require('../config/constant')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const { key, expires, iv } = SECRET
const encKey = CryptoJS.enc.Utf8.parse(key)
const encIv = CryptoJS.enc.Utf8.parse(iv)

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
  try {
    const jwtInfo = jwt.verify(token, key)
    return jwtInfo
  } catch (err) {
    return 'token不合法'
  }
}

// 根据userId生成token
const generatorToken = (data) => {
  return jwt.sign( data , key, { expiresIn: expires } )
}


// 格式化查询参数
const formatFilterSql = (arr) => {
  let first=true
  let sql=''
  arr.forEach(item => {
    if(item.value){
      const s1=`${first?' WHERE ':' AND '}`
      let s2=''
      if(item.value){
        s2 = item.type==='like'?`${item.key} LIKE '%${item.value}%' `:`${item.key} = '${item.value}' `
      }
      const s=s1+s2
      sql+=s
      first=false
    }
  });
  return sql
}

// 随机密钥
const randomKey = () => {
  const randomBytes = CryptoJS.lib.WordArray.random(8)
  const randomString = randomBytes.toString(CryptoJS.enc.Base64)
  return randomString
}

// CryptoJS加密
const encrypt = (message) => {
  var encrypted = CryptoJS.AES.encrypt(message.toString(), encKey, { iv: encIv, mode: CryptoJS.mode.CBC}).ciphertext.toString( CryptoJS.enc.Base64 )
  return encrypted
}
// 解密
const decrypt = (message) => {
  // 解密
  var decrypted = CryptoJS.AES.decrypt(message, encKey, { iv: encIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  var decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedStr
}

module.exports={
  getIpAddress,
  getClientIpAddress,
  decodeToken,
  generatorToken,
  formatFilterSql,
  randomKey,
  encrypt,
  decrypt
}