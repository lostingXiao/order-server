//接收上传的excel文件，保存解析返回objects
const path = require('path');
const { FIXED_KEY } = require('../../config/constant');

const uploadImgService = async (file)=>{
    const { staticDomain } = FIXED_KEY
    const basename = path.basename(file.filepath);
    const url = `${staticDomain}/images/${basename}`
    return url
}

module.exports =  {
    uploadImgService
}