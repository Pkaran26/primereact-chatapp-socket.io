import { combineReducers } from 'redux'
import userReducers from './userReducers'
import chatReducers from './chatReducers'

const rootReducer = combineReducers({
  user: userReducers,
  chat: chatReducers
})

export default rootReducer
