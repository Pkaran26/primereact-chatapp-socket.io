import { CHAT } from '../Types'

const { GET_ALL_USERS_MESSAGES, LOGOUT } = CHAT

const initialState = {
  messages: []
}

const chatReducers = (state = initialState, action)=>{
  switch (action.type) {
    case GET_ALL_USERS_MESSAGES:
      return { ...state, messages: action.payload }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default chatReducers
