//接收上传的excel文件，保存解析返回objects
const path = require('path');
const user = require('../../models/user')
const query =require('../../utils/query')

const uploadImgService = async (file)=>{
    const basename = path.basename(file.filepath);
    const url = `/images/${basename}`
    return url
}

//获取用户列表
const getUserIdService = async ({ username, password }) => {
    const list=await query(user.id({ username, password }))
    const result=list[0]
    return result
}

module.exports =  {
    uploadImgService,
    getUserIdService
}
