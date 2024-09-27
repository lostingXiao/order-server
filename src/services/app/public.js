//接收上传的excel文件，保存解析返回objects
const user = require('../../models/user')
const query =require('../../utils/query')

// 获取用户id
const getUserIdService = async ({ username, password }) => {
    const list=await query(user.id({ username, password }))
    const result=list[0]
    return result
}
// 获取餐桌id
const getTableIdService = async ( code ) => {
    const result = decrypt(code)
    return parseInt(result)
}

module.exports =  {
    getUserIdService,
    getTableIdService
}
