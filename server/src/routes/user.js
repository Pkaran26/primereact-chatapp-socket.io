import Router from 'koa-router'
import {
  getUsers,
  doSignup,
  doLogin
} from '../models/user.js'

const userRouter = new Router({
  prefix: '/user'
})

userRouter.post('/signup', doSignup)
userRouter.post('/login', doLogin)
userRouter.get('/', getUsers)

export default userRouter
