let connections = []

const socketFunc = (io)=>{
  io.sockets.on('connection', function(socket){
    connections.push(socket)
    console.log('Connected: ', connections.length)
    // updateUsers()
    //disconnected
    socket.on('disconnect', function(data){
      const index = connections.indexOf(socket)
      connections.splice(index, 1)
      // updateUsers()
      console.log('Connected: ', connections.length)
    })

    socket.on('SEND_MESSAGE', function(payload){
      console.log(payload);
    })
  })
}

export default socketFunc
