import koa from 'koa'
import http from 'http'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import DBPool from './utils/dbPool.js'
import mongodb from 'mongodb'
import cors from '@koa/cors'
import socket from 'socket.io'
import chatRouter from './routes/chat.js'
import userRouter from './routes/user.js'
import socketFunc from './socket/chat.js'

const app = new koa()
const server = http.createServer(app.callback())
const io = socket(server)
server.listen(8181)
console.log('Server running...')

socketFunc(io)
app.use(logger())
app.use(cors())
app.use(bodyParser())
app.use( async (ctx, next)=>{
  ctx.db = await DBPool()
  ctx.ObjectId = mongodb.ObjectId
  await next()
})

app.use(chatRouter.routes()).use(chatRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
