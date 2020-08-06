import Joi from 'joi'
import {
  dbError,
  dbMessage
} from '../utils/messages.js'

export const userSignup = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required()
})

export const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const getUsers = async ctx=>{
  try {
    ctx.body = await ctx.db.collection('user').find({}).toArray()
  } catch (e) {
    ctx.body = dbError(e)
  }
}

export const doSignup = async ctx=>{
  const { err, value } = userSignup.validate(ctx.request.body)
  if(err){
    ctx.body = dbError(err)
  }

  try {
    const result = await ctx.db.collection('user').insertOne({
      ...value,
    })

    if(result && result.insertedCount){
      ctx.body = dbMessage(true, 'signup success')
    }
  } catch (e) {
    ctx.body = dbError(e)
  }
}

export const doLogin = async ctx=>{
  const { err, value } = userLogin.validate(ctx.request.body)
  if(err){
    ctx.body = dbError(err)
  }

  try {
    const { err, value } = userSignup.validate(ctx.request.body)
    ctx.body = await ctx.db.collection('user').find({
      ...value
    }).toArray()
  } catch (e) {
    ctx.body = dbError(e)
  }
}
