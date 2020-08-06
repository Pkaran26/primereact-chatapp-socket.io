import React, { useState, useEffect, useRef } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { NavLink } from 'react-router-dom'
import SideImg from './SideImg'
import Loader from '../Common/Loader'
import {
  useDispatch,
  useSelector
} from "react-redux"
import {
  doLogin,
  setProfile
} from '../../Redux/Actions/userActions'
import { Growl } from 'primereact/growl'

const Login = ()=>{
  const [payload, setPayload] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const status = useSelector(state => state.user.login)
  let alert = useRef(null)

  useEffect(()=>{
    setLoading(status.loading)
    if(status && status.user && status.user.length>0){
      dispatch(setProfile(status.user[0]))
      alert.current.show({
        life: 3000,
        severity: 'primary',
        summary: 'Success Message',
        detail: 'login success'
      })
    }else if(status && status.user && status.user.length === 0){
      alert.current.show({
        life: 3000,
        severity: 'danger',
        summary: 'Error Message',
        detail: 'login error'
      })
    }
    console.log(status);
  }, [status])

  const setter = (key, value)=>{
    setPayload({
      ...payload,
      [key]: value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(doLogin(payload))
  }

  return (
    <form className="p-grid" onSubmit={ handleSubmit }>
      { loading?
        <Loader/>
      :null }
      <Growl ref={ alert } />
      <div className="p-col-8">
        <SideImg />
      </div>
      <div className="p-col-4">
        <Card className="p-fluid">
          <h3>Login</h3>
          <hr />
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="email"
              onChange={ (e)=> setter('email', e.target.value) }
              value={ payload.email }
              required={ true }
            />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="password"
              onChange={ (e)=> setter('password', e.target.value) }
              value={ payload.password }
              required={ true }
            />
          </div>
          <div className="p-field">
            <Button type="submit" style={{ width: '120px' }} label="Login"  />
            <NavLink to="/signup" style={{ marginLeft: '10px' }}>Create an account</NavLink>
          </div>
        </Card>
      </div>
    </form>
  )
}

export default Login
