
const query =require('../../utils/query');
const { menu }= require('../../models/admin/system')

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



module.exports = {
  getMenuAllService,
  addMenuService,
  getMenuCountService,
  editMenuService,
  delMenuService
}
