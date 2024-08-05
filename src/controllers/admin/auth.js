const { 
  addAuthService,
} = require('../../services/admin/system')

//添加菜单
const addAuthApi = async (ctx, next) => {
  console.log('addAuthApi');
  try{
    const { name,path,parentId } = ctx.request.body
    const _parentId=parentId||null
    const res = await addAuthService({name,path,parentId:_parentId})
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

module.exports = {
  addAuthApi
}