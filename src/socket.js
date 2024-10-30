const { Server } = require("socket.io")
const { jwtMiddlewareDealHttp, platformMiddlewareDeal } = require('./middleware/jwt')
const { order } = require('./controllers/app')
const socketOrder = require("./router/socketOrder")
const socketOrderList = require("./router/socketOrderList")

const io = {
  createServer(server='',options={}){
    const ioServer = new Server(server, options)
    ioServer.on('connection', (socket) => {
      console.log('connection---------')
      console.log(socket.id)
      socket.on("disconnect", (reason) => {
        console.log('disconnect---------')
        console.log(reason)
      });
    });
    const order = ioServer.of('/order')
    order.on('connection', (socket) => socketOrder(order, socket))
    const orderList = ioServer.of('/orderList')
    orderList.on('connection', (socket) => socketOrderList(orderList, socket))
  }
}

module.exports = io


