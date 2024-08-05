const crypto = require('crypto')
const { 
  getMenuAllService,
  addMenuService,
  editMenuService,
  delMenuService,
  getMenuCountService,
  addAuthService,
  getAuthCountService,
  getAuthListService
} = require('../../services/admin/system')

//添加菜单
const addMenuApi = async (ctx, next) => {
  console.log('addMenuApi');
  try{
    const { name,path,parentId } = ctx.request.body
    const _parentId=parentId||null
    const res = await addMenuService({name,path,parentId:_parentId})
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

//菜单列表
const menuListApi = async (ctx, next) => {
  try{
    const menuList = await getMenuAllService()
    const sqlList=menuList.map(item=>({
      title:item.name,
      name:item.name,
      id:item.id,
      key:item.id,
      path:item.path,
      parentId:item.parent_id,
    }))
    let list=sqlList.filter(item=>!item.parentId)
    const formatList=(arr)=>{
      arr.forEach(item=>{
        const children=sqlList.filter(o=>o.parentId===item.id)
        if(children.length){
          item.children=children
          formatList(children)
        }
      })
    }
    formatList(list)
    console.log('menuListApi----list')
    console.log(list)
    ctx.body={list}
  }catch(err){
    console.log('menuListApi_______catch(err)')
    throw err
  }
  return next()
}

//编辑菜单
const editMenuApi = async (ctx, next) => {
  console.log('editMenuApi');
  try{
    const { name,path,id } = ctx.request.body
    const res = await editMenuService({name,path,id})
    console.log(res)
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

//删除菜单
const delMenuApi = async (ctx, next) => {
  console.log('delMenuApi');
  try{
    const { id } = ctx.request.body
    const res = await delMenuService(id)
    console.log(res)
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

//添加权限
const addAuthApi = async (ctx, next) => {
  console.log('addMenuApi');
  try{
    const { name } = ctx.request.body
    const randomBytes = crypto.randomBytes(8); // 生成8个字节（64位）的随机数
    const code = randomBytes.toString('hex');
    const res = await addAuthService({name,code })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

//或缺权限列表
const authListApi = async (ctx, next) => {
  console.log('authListApi');
  try{
    const { name,code,pageNum,pageSize } = ctx.request.body
    const count = await getAuthCountService({name,code})
    console.log(count)
    const total = count[0]['COUNT(*)']
    const list = await getAuthListService({ name,code,pageNum,pageSize })
    console.log(list)
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}


module.exports = {
  addMenuApi,
  menuListApi,
  editMenuApi,
  delMenuApi,
  addAuthApi,
  authListApi
}
