
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
  getRoleAllService,
  getRoleDetaiByIdService,
  editRoleByIdService
} = require('../../services/admin/system')


//添加菜单
const addMenuApi = async (ctx, next) => {
  console.log('addMenuApi');
  try{
    const { name,path,parentId } = ctx.request.body
    await addMenuService({name,path,parentId:parentId||null})
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
    ctx.body={list}
  }catch(err){
    throw err
  }
  return next()
}

//编辑菜单
const editMenuApi = async (ctx, next) => {
  console.log('editMenuApi');
  try{
    const { name,path,id } = ctx.request.body
    await editMenuService({name,path,id})
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
    await delMenuService(id)
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
    await addAuthService({name,code })
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
    await addRoleService({name,keyword,permissions,menus })
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
    await addUserApiService({ username,password,phone,roleId,shopId:shopId||null })
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

//用户详情
const getUserInfoApi = async (ctx, next) => {
  console.log('getUserInfoApi______________________');
  try{
    const { userInfo } = ctx
    userInfo.role_permissions=JSON.parse(userInfo.role_permissions)
    ctx.body={ ...userInfo }
  }catch(err){
    throw err
  }
  return next()
}

//用户详情
const roleDetailApi = async (ctx, next) => {
  console.log('roleDetaillApi-------------');
  try{
    const { id } = ctx.request.body
    const list = await getRoleDetaiByIdService(id)
    const detail = list[0]
    detail.permissions=JSON.parse(detail.permissions)
    detail.menus=JSON.parse(detail.menus)
    ctx.body={ ...detail }
  }catch(err){
    throw err
  }
  return next()
}

//用户详情
const editRoleApi = async (ctx, next) => {
  console.log('editRoleApi-------------');
  try{
    const { id,name,permissions:pers,menus:mes } = ctx.request.body
    const permissions=JSON.stringify(pers) 
    const menus=JSON.stringify(mes) 
    await editRoleByIdService({ id,name,permissions,menus })
    ctx.body={}
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
  roleAllApi,
  getUserInfoApi,
  roleDetailApi,
  editRoleApi

}
