const { jwtMiddlewareDealSocket } = require('../middleware/jwt')
const { socket : socketaController } = require('../controllers/app')

module.exports = (server, socket) => {
  server.use(jwtMiddlewareDealSocket)
  const socketEmit = (tableId,name,data) => socket.to(tableId).emit(name,{tableId,...data}) 
  const socketConnection = async (socket) => {
    console.log('connection---------orderList')
    console.log(socket.nsp.name)
    const tableId=socket.tableId
    socket.join(tableId)
    const res = await socketaController.orderListApi(tableId)
    socketEmit(tableId,'orderStatusChange', {tableId,...res})
  }
  const orderCancelHandle = async (data, callback) => {
    const tableId=socket.tableId
    const listRes = await socketaController.orderCancelApi(tableId, data)
    socketEmit(tableId,'orderStatusChange', listRes)
    callback({tableId,...listRes})
  }

  const orderDetailCancelHandle = async (data, callback) => {
    const tableId=socket.tableId
    // console.log(tableId)
    const listRes = await socketaController.orderDetailCancelApi(tableId, data)
    socketEmit(tableId,'orderStatusChange', listRes)
    callback({tableId,...listRes})
  }
  
  server.on('connection', socketConnection)     
  socket.on('orderCancel', orderCancelHandle)
  socket.on('orderDetailCancel', orderDetailCancelHandle)
  socket.on('disconnect', (reason) => {
    console.log('disconnect---------')
    console.log(reason)
  })  
}