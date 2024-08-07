
const { 
  uploadImgService,
} = require('../../services/admin/upload')

//用户列表
const uploadImgApi = async (ctx, next) => {
  try{
    const file = ctx.request.files.file;
    const url = await uploadImgService(file)
    ctx.body={url}
  }catch(err){
    throw err
  }
  return next()
}

module.exports = {
  uploadImgApi
}