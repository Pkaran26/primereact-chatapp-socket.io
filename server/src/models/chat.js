import Joi from 'joi'
import {
  dbError,
  dbMessage
} from '../utils/messages.js'

export const chat = Joi.object({
  sender: Joi.string().required(),
  receiver: Joi.string().required(),
  message: Joi.string().required(),
  time: Joi.date().iso().required()
})

export const getChat = async ctx=>{
  try {
    ctx.body = await ctx.db.collection('chat').find({
      sender: ctx.params.sender,
      receiver: ctx.params.receiver
    }).toArray()
  } catch (e) {
    ctx.body = dbError(e)
  }
}

export const addChat = async ctx=>{
  const { err, value } = chat.validate(ctx.request.body)
  if(err){
    ctx.body = dbError(err)
  }

  try {
    const result = await ctx.db.collection('chat').insertOne({
      ...value,
    })

    if(result && result.insertedCount){
      ctx.body = dbMessage(true, 'chat added')
    }
  } catch (e) {
    ctx.body = dbError(e)
  }
}

export const deleteChat = async ctx=>{
  try {
    ctx.body = await ctx.db.collection('chat').deleteOne({
      _id: ctx.params.id
    }).toArray()
  } catch (e) {
    ctx.body = dbError(e)
  }
}
