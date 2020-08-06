import Router from 'koa-router'
import {
  getChat
} from '../models/chat.js'

const chatRouter = new Router({
  prefix: '/chat'
})

chatRouter.get('/', getChat)

export default chatRouter
