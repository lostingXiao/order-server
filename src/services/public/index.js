const query =require('../../utils/query')
const user = require('../../models/user')

// 获取用户基本信息
const getUserInfoByIdService = async ({ userId, tableId }) => {
  const list = userId ? await query(user.info(userId)) : [{}]
  const userInfo=list[0]
  const result = { userId, tableId, userInfo }
  return result
}

module.exports = {
  getUserInfoByIdService,
}