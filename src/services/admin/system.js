
const query =require('../../utils/query');
const { menu, auth, role, user }= require('../../models/admin/system')

// 获菜单列表
const getMenuAllService = async () => {
  const result=await query(menu.all());
  return result
}
const getMenuCountService = async () => {
  const result=await query(menu.count());
  return result
}

// 添加菜单
const addMenuService = async ({name,path,parentId}) => {
  const result=await query(menu.add({ name,path,parentId }));
  return result
}

// 编辑菜单
const editMenuService = async ({name,path,id}) => {
  const result=await query(menu.edit({ name,path,id }));
  return result
}
// 删除菜单
const delMenuService = async (id) => {
  const result=await query(menu.del(id));
  return result
}
// 添加权限
const addAuthService = async ({name,code }) => {
  const result=await query(auth.add({ name,code }));
  return result
}

// 获取权限列表总数
const getAuthCountService = async ({ name,code }) => {
  const result=await query(auth.count({ name,code }));
  return result
}
// 分页获取权限列表
const getAuthListService = async ({ name,code,pageNum,pageSize }) => {
  const result=await query(auth.list({ name,code,pageNum,pageSize }));
  return result
}
//  权限全列表
const getAuthAllService = async () => {
  const result=await query(auth.all());
  return result
}

// 获取角色列表总数
const getRoleCountService = async ({ name,keyword }) => {
  const result=await query(role.count({ name,keyword }));
  return result
}
// 分页获取角色列表
const getRoleListService = async ({ name,keyword,pageNum,pageSize }) => {
  const result=await query(role.list({ name,keyword,pageNum,pageSize }));
  return result
}
// 添加角色
const addRoleService = async ({ name,keyword,permissions,menus }) => {
  const result=await query(role.add({ name,keyword,permissions,menus }));
  return result
}
//  用户全列表
const getRoleAllService = async () => {
  const result=await query(role.all());
  return result
}

// 添加用户
const addUserApiService = async ({ username,password,phone,roleId,shopId }) => {
  const result=await query(user.add({ username,password,phone,roleId,shopId }));
  return result
}
// 获取用户列表总数
const getUserCountService = async ({ username,phone }) => {
  const result=await query(user.count({ username,phone }));
  return result
}
// 分页获取用户列表
const getUserListService = async ({ username,phone,pageNum,pageSize }) => {
  const result=await query(user.list({ username,phone,pageNum,pageSize }));
  return result
}






module.exports = {
  getMenuAllService,
  addMenuService,
  getMenuCountService,
  editMenuService,
  delMenuService,
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
}
