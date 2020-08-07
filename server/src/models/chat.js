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
    ctx.body = await ctx.db.collection('chat').aggregate([
      { $match: {
        $or: [
          {
            sender: ctx.ObjectId(ctx.params.sender),
            receiver: ctx.ObjectId(ctx.params.receiver)
          },
          {
            receiver: ctx.ObjectId(ctx.params.sender),
            sender: ctx.ObjectId(ctx.params.receiver)
          }
        ]
      }},
      { $lookup: {
       from: 'user',
       localField: 'sender',
       foreignField: '_id',
       as: 'sender'
      }},
      { $lookup: {
        from: 'user',
        localField: 'receiver',
        foreignField: '_id',
        as: 'receiver'
      }},
      { $unwind: "$sender" },
      { $unwind: "$receiver" },
      { $project: {
        sender: {
          _id: '$sender._id',
          first_name: '$sender.first_name',
          last_name: '$sender.last_name'
        },
        receiver: {
          _id: '$receiver._id',
          first_name: '$receiver.first_name',
          last_name: '$receiver.last_name'
        },
        message: '$message',
        time: '$time'
      }}
    ]).toArray()
  } catch (e) {
    ctx.body = dbError(e)
  }
}
/*
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
*/
export const deleteChat = async ctx=>{
  try {
    ctx.body = await ctx.db.collection('chat').deleteOne({
      _id: ctx.params.id
    }).toArray()
  } catch (e) {
    ctx.body = dbError(e)
  }
}
