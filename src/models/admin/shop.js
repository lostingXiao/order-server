import sequelize from "../utils/pool";
import { Model, DataTypes } from "sequelize";


export const findShopList = ({ pageSize,pageNum,name })=>{
  return `SELECT * FROM aunt_details WHERE IFNULL(name, '') LIKE '%${name}%' ORDER BY updated_at DESC LIMIT ${(pageNum-1)*pageSize},${pageSize}`;
}

export const findShopCount = ({ name })=>{
  return `SELECT COUNT(*) FROM aunt_details WHERE IFNULL(name, '') LIKE '%${name}%'`;
}
