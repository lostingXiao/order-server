
const {randomKey}=require('../../utils/util')
const { 
  getMenuAllService,
  addMenuService,
  editMenuService,
  delMenuService,
  getMenuCountService,
  addAuthService,
  getAuthCountService,
  getAuthListService,
  getRoleCountService,
  getRoleListService,
  addRoleService,
  getAuthAllService,
  addUserApiService,
  getUserCountService,
  getUserListService,
  getRoleAllService
} = require('../../services/admin/system')


//添加菜单
const addMenuApi = async (ctx, next) => {
  console.log('addMenuApi');
  try{
    const { name,path,parentId } = ctx.request.body
    const res = await addMenuService({name,path,parentId:parentId||null})
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
  try{
    const { name } = ctx.request.body
    const code = randomKey()
    const res = await addAuthService({name,code })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

//权限列表
const authListApi = async (ctx, next) => {
  console.log('authListApi');
  try{
    const { name,code,pageNum,pageSize } = ctx.request.body
    const count = await getAuthCountService({ name,code })
    const total = count[0]['COUNT(*)']
    const list = await getAuthListService({ name,code,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}

//角色全列表
const authAllApi = async (ctx, next) => {
  console.log('authAllApi');
  try{
    const list = await getAuthAllService()
    ctx.body={list}
  }catch(err){
    throw err
  }
  return next()
}

//角色列表
const roleListApi = async (ctx, next) => {
  console.log('roleListApi');
  try{
    const { name,keyword,pageNum,pageSize } = ctx.request.body
    const count = await getRoleCountService({ name,keyword })
    const total = count[0]['COUNT(*)']
    const list = await getRoleListService({ name,keyword,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}

//角色新增
const addRoleApi = async (ctx, next) => {
  try{
    const { name,permissions,menus } = ctx.request.body
    const keyword = randomKey()
    const res = await addRoleService({name,keyword,permissions,menus })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

//角色全列表
const roleAllApi = async (ctx, next) => {
  try{
    const list = await getRoleAllService()
    ctx.body={list}
  }catch(err){
    throw err
  }
  return next()
}

//用户新增
const addUserApi = async (ctx, next) => {
  console.log('addUserApi');
  try{
    const { username,password,phone,roleId,shopId } = ctx.request.body
    const res = await addUserApiService({ username,password,phone,roleId,shopId:shopId||null })
    ctx.body={}
  }catch(err){
    throw err
  }
  return next()
}

//用户列表
const userListApi = async (ctx, next) => {
  console.log('userListApi');
  try{
    const { username,phone,pageNum,pageSize } = ctx.request.body
    const count = await getUserCountService({ username,phone })
    const total = count[0]['COUNT(*)']
    const list = await getUserListService({ username,phone,pageNum,pageSize })
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
  authListApi,
  roleListApi,
  addRoleApi,
  authAllApi,
  addUserApi,
  userListApi,
  roleAllApi

}
