import { CHAT } from '../Types'

const { GET_ALL_USERS_MESSAGES } = CHAT

const initialState = {
  messages: []
}

const chatReducers = (state = initialState, action)=>{
  switch (action.type) {
    case GET_ALL_USERS_MESSAGES:
      return { ...state, messages: action.payload }
    default:
      return state
  }
}

export default chatReducers
