import koa from 'koa'
import http from 'http'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import DBPool from './utils/dbPool.js'
import mongodb from 'mongodb'
import chatRouter from './routes/chat.js'
import userRouter from './routes/user.js'

const app = new koa()
const server = http.createServer(app.callback())
server.listen(8181)
console.log('Server running...')

app.use(logger())
app.use(bodyParser())
app.use( async (ctx, next)=>{
  ctx.db = await DBPool()
  ctx.ObjectId = mongodb.ObjectId
  await next()
})

app.use(chatRouter.routes()).use(chatRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
