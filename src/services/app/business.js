const query =require('../../utils/query')
const user = require('../../models/user')
// 获取店铺商家基本信息
const getUserInfoByIdService = async (id) => {
  const list=await query(user.info(id))
  const result=list[0]
  return result
}

module.exports = {
  getUserInfoByIdService
}