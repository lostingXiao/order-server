const { 
  getMenuAllService,
  addMenuService,
  editMenuService,
  delMenuService,
  getMenuCountService
} = require('../../services/admin/system')

//添加菜单
const addMenuApi = async (ctx, next) => {
  console.log('addMenuApi');
  try{
    const { name,path,parentId } = ctx.request.body
    const _parentId=parentId||null
    const res = await addMenuService({name,path,parentId:_parentId})
    console.log('setMenuService----setMenuService')
    console.log(res)
    ctx.body={}
  }catch(err){
    ctx.body=err
  }
  return next()
}

//菜单列表
const menuListApi = async (ctx, next) => {
  try{
    const menuList = await getMenuAllService()
    // const menuCount = await getMenuCountService()
    console.log('menuListApi----shopList')
    console.log(menuList)
    const list=menuList.map(item=>{
      const { id, name, path, parent_id }=item
      console.log('menuList.map')
      console.log(item)
      return { id, name, path, parent_id }
    })
    console.log(list)
    ctx.body={list}
  }catch(err){
    ctx.body=err
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
    ctx.body=err
  }
  return next()
}

//编辑菜单
const delMenuApi = async (ctx, next) => {
  console.log('delMenuApi');
  try{
    const { id } = ctx.request.body
    const res = await delMenuService(id)
    console.log(res)
    ctx.body={}
  }catch(err){
    ctx.body=err
  }
  return next()
}



module.exports = {
  addMenuApi,
  menuListApi,
  editMenuApi,
  delMenuApi
}
