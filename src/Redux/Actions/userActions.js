import { USER } from '../Types'
import axios from 'axios'
import { SERVER_URL } from '../../Config'

const { SIGNUP, LOGIN, PROFILE, GET_USERS } = USER

export const doSignup = (payload) => dispatch =>{
  dispatch({ type: SIGNUP, payload: { loading: true } })

  axios.post(`${ SERVER_URL }/user/signup`, payload)
  .then(res=>{
    dispatch({ type: SIGNUP, payload: { loading: false, ...res.data } })
  })
  .catch(err=>{
    dispatch({ type: SIGNUP, payload: { loading: false, ...err } })
  })
}

export const doLogin = (payload) => dispatch =>{
  dispatch({ type: LOGIN, payload: { loading: true } })

  axios.post(`${ SERVER_URL }/user/login`, payload)
  .then(res=>{
    dispatch({ type: LOGIN, payload: { loading: false, ...res.data } })
  })
  .catch(err=>{
    dispatch({ type: LOGIN, payload: { loading: false, ...err } })
  })
}

export const getProfile = (id) => dispatch =>{
  dispatch({ type: PROFILE, payload: { loading: true } })

  axios.get(`${ SERVER_URL }/user/profile/${ id }`)
  .then(res=>{
    dispatch({ type: PROFILE, payload: { loading: false, ...res.data } })
  })
  .catch(err=>{
    dispatch({ type: PROFILE, payload: { loading: false, ...err } })
  })
}

export const fetchUsers = (keyword) => dispatch =>{
  dispatch({ type: GET_USERS, payload: { loading: true } })

  axios.get(`${ SERVER_URL }/user/list/${ keyword }`)
  .then(res=>{
    dispatch({ type: GET_USERS, payload: { loading: false, ...res.data } })
  })
  .catch(err=>{
    dispatch({ type: GET_USERS, payload: { loading: false, ...err } })
  })
}
