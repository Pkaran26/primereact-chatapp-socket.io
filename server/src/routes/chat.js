import Router from 'koa-router'
import {
  getChat
} from '../models/chat.js'

const chatRouter = new Router({
  prefix: '/chat'
})

chatRouter.get('/:sender/:receiver', getChat)

export default chatRouter
