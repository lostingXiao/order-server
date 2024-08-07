const { koaBody } = require('koa-body')
const path = require('path')

//图片文件上传处理
const uploadImgDeal=()=>{
  return koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '../public/images'), // 设置文件上传目录
      keepExtensions: true,
      maxFieldsSize: 1 * 1024 * 1024, // 最大文件为2兆
      multipart: true // 是否支持 multipart-formdate 的表单
    }
  })
}

module.exports = {
  uploadImgDeal
}