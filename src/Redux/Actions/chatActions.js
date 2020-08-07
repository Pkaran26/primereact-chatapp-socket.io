import { CHAT } from '../Types'
import axios from 'axios'
import { SERVER_URL } from '../../Config'

const { GET_ALL_USERS_MESSAGES, LOGOUT } = CHAT

export const fetchMessages = () => dispatch =>{
  dispatch({ type: GET_ALL_USERS_MESSAGES, payload: { loading: true } })

  axios.get(`${ SERVER_URL }/chat/:sender/:receiver`)
  .then(res=>{
    dispatch({ type: GET_ALL_USERS_MESSAGES, payload: { loading: false, ...res.data } })
  })
  .catch(err=>{
    dispatch({ type: GET_ALL_USERS_MESSAGES, payload: { loading: false, ...err } })
  })
}

export const deleteMessages = () => dispatch =>{
  dispatch({ type: LOGOUT })
}
