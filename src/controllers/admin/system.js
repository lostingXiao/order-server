
const {randomKey}=require('../../utils/util')
const { 
  getMenuAllService,
  addMenuService,
  editMenuService,
  delMenuService,
  getMenuTotalService,
  addAuthService,
  getAuthTotalService,
  getAuthListService,
  getRoleTotalService,
  getRoleListService,
  addRoleService,
  getAuthAllService,
  addUserApiService,
  getUserTotalService,
  getUserListService,
  getRoleAllService,
  getRoleDetaiByIdService,
  editRoleByIdService,
  rolePermissionsByUserIdService,
  userDetailByIdService,
  editUserByIdService
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
    const res = await getAuthTotalService({ name,code })
    const total = res[0].total
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
    const res = await getRoleTotalService({ name,keyword })
    const total = res[0].total
    const list = await getRoleListService({ name,keyword,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}

//角色新增
const addRoleApi = async (ctx, next) => {
  console.log('addRoleApi---------------')
  try{
    const { name,permissions:pers,menus:mes } = ctx.request.body
    const permissions=JSON.stringify(pers)
    const menus=JSON.stringify(mes)
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
    const { username,password,phone,roleId,shopId=null } = ctx.request.body
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
    const res = await getUserTotalService({ username,phone })
    const total = res[0].total
    const list = await getUserListService({ username,phone,pageNum,pageSize })
    ctx.body={total,list}
  }catch(err){
    throw err
  }
  return next()
}

//用户详情
const getUserInfoApi = async (ctx, next) => {
  console.log('getUserInfoApi-----------------')
  try{
    const { userInfo } = ctx
    ctx.body={ ...userInfo }
  }catch(err){
    throw err
  }
  return next()
}

//角色详情
const roleDetailApi = async (ctx, next) => {
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

//编辑角色
const editRoleApi = async (ctx, next) => {
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

//用户授权认证
const authorizationApi = async (ctx, next) => {
  try{
    const userId = ctx.userId
    const res = await rolePermissionsByUserIdService(userId)
    const permissions = JSON.parse(res[0].permissions) 
    const { code } = ctx.request.body
    const result = permissions.includes(code)
    console.log('authorizationApi-----res')
    console.log(result)
    ctx.body={result}
  }catch(err){
    throw err
  }
  return next()
}

const userDetailApi = async (ctx, next) => {
  try{
    const { id } = ctx.request.body
    const res = await userDetailByIdService(id)
    ctx.body={ ...res[0] }
  }catch(err){
    throw err
  }
  return next()
}

const editUserApi = async (ctx, next) => {
  console.log('editUserApi-------')
  try{
    const { id,username,password,phone,roleId,shopId=null } = ctx.request.body
    console.log(id,username,password,phone,roleId,shopId)
    await editUserByIdService({ id,username,password,phone,roleId,shopId })
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
  editRoleApi,
  authorizationApi,
  userDetailApi,
  editUserApi

}
