const { jwtMiddlewareDealSocket } = require('../middleware/jwt')
const { socket : socketaController } = require('../controllers/app')

module.exports = (server, socket) => {
  server.use(jwtMiddlewareDealSocket)
  const socketEmit = (tableId,name,data) => socket.to(tableId).emit(name,{tableId,...data}) 
  const socketConnection = async (socket) => {
    server.use(jwtMiddlewareDealSocket)
    console.log('connection---------order')
    const tableId=socket.tableId
    socket.join(tableId)
    const res = await socketaController.tempGoodsListApi(tableId)
    socketEmit(tableId,'orderChange', {tableId,...res})
  }
  const orderAddHandle = async (data, callback) => {
    const tableId=socket.tableId
    console.log('orderAddHandle')
    console.log(tableId)
    const listRes = await socketaController.addTempGoodsListApi(tableId, data)
    socketEmit(tableId,'orderChange', listRes)
    callback({tableId,...listRes})
  }
  const orderSubHandle = async (data, callback) => {
    const tableId=socket.tableId
    const listRes = await socketaController.subTempGoodsListApi(tableId, data)
    socketEmit(tableId,'orderChange', listRes)
    callback({tableId,...listRes})
  }

  server.on('connection', socketConnection)     
  socket.on('orderAdd', orderAddHandle)
  socket.on('orderSub', orderSubHandle)
  socket.on('disconnect', (reason) => {
    console.log('disconnect---------')
    console.log(reason)
  })  
}