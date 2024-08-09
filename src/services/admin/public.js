//接收上传的excel文件，保存解析返回objects
const path = require('path');
const { FIXED_KEY } = require('../../config/constant')
const user = require('../../models/admin/user')
const query =require('../../utils/query')

const uploadImgService = async (file)=>{
    const { staticDomain } = FIXED_KEY
    const basename = path.basename(file.filepath);
    const url = `${staticDomain}/images/${basename}`
    return url
}

// 分页获取用户列表
const getUserIdService = async ({ username, password }) => {
    const result=await query(user.id({ username, password }));
    return result
}

module.exports =  {
    uploadImgService,
    getUserIdService
}