import mongodb from 'mongodb'
import DBPool from '../utils/dbPool.js'

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

    socket.on('SEND_MESSAGE', async function(payload){
      const { sender, receiver, message, time } = payload
      if(receiver.socket_id){
        io.sockets.to(`${ receiver.socket_id }`).emit('GET_MESSAGE', payload)
      }
      try {
        const db = await DBPool()
        const result = await db.collection('chat').insertOne({
          sender: mongodb.ObjectId(sender._id),
          receiver: mongodb.ObjectId(receiver._id),
          message: message,
          time: time
        })
      } catch (e) {
        console.log(e);
      }
    })
  })
}

export default socketFunc
