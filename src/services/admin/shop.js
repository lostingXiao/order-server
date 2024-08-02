

// 获取店铺列表
// export const getGroupListService = ({offset, limit, keyword}) => {
//   return Group.findAndCountAll({
//       order: [['id', 'desc']],
//       offset,
//       limit,
//       where: {
//           name: {
//               [Op.like]: `%${keyword}%`
//           }
//       }
//   })
// }

// const sqlResult = await poolSql(sql);