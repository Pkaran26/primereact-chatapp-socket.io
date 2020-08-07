import { USER } from '../Types'

const { SIGNUP, LOGIN, PROFILE, GET_USERS } = USER

const initialState = {
  signup: '',
  login: '',
  profile: '',
  users: []
}

const userReducer = (state = initialState, action)=>{
  switch (action.type) {
    case SIGNUP:
      return { ...state, signup: action.payload }
    case LOGIN:
      return { ...state, login: action.payload }
    case PROFILE:
      return { ...state, profile: action.payload }
    case GET_USERS:
      return { ...state, users: action.payload }
    default:
      return state
  }
}

export default userReducer
