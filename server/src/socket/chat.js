let connections = []
let users = new Set()

const socketFunc = (io)=>{
  io.sockets.on('connection', function(socket){
    connections.push(socket)
    console.log('Connected: ', connections.length)

    socket.on('disconnect', function(){
      const index = connections.indexOf(socket)
      connections.splice(index, 1)
      users.delete(socket.user)
      console.log('Connected: ', connections.length)
    })

    socket.on('USER_DETAIL', function(data){
      socket.user = data
      users.add(data)
      io.sockets.emit('GET_USERS', Array.from(users))
    })

    socket.on('TYPING', function(payload){
      const { receiver, typing } = payload
      if(receiver.socket_id){
        io.sockets.to(`${ receiver.socket_id }`).emit('USER_TYPING', typing)
      }
    })

    socket.on('SEND_MESSAGE', function(payload){
      const { receiver } = payload
      if(receiver.socket_id){
        io.sockets.to(`${ receiver.socket_id }`).emit('GET_MESSAGE', payload)
      }
    })
  })
}

export default socketFunc
