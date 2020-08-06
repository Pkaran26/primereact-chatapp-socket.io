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
  doSignup
} from '../../Redux/Actions/userActions'
import { Growl } from 'primereact/growl'

const Signup = ()=>{
  const [payload, setPayload] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    cpassword: ''
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const status = useSelector(state => state.user.signup)
  let alert = useRef(null)

  useEffect(()=>{
    setLoading(status.loading)
    if(status.status){
      alert.current.show({
        life: 3000,
        severity: 'primary',
        summary: 'Success Message',
        detail: status.message
      })
    }else if(status.status === false){
      alert.current.show({
        life: 3000,
        severity: 'danger',
        summary: 'Error Message',
        detail: status.message
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
    dispatch(doSignup(payload))
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
          <h3>Signup</h3>
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
            <label htmlFor="first_name">First Name</label>
            <InputText
              id="first_name"
              type="text"
              onChange={ (e)=> setter('first_name', e.target.value) }
              value={ payload.first_name }
              required={ true }
            />
          </div>
          <div className="p-field">
            <label htmlFor="last_name">Last Name</label>
            <InputText
              id="last_name"
              type="text"
              onChange={ (e)=> setter('last_name', e.target.value) }
              value={ payload.last_name }
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
            <label htmlFor="cpassword">Confirm Password</label>
            <InputText
              id="cpassword"
              type="password"
              onChange={ (e)=> setter('cpassword', e.target.value) }
              value={ payload.cpassword }
              required={ true }
            />
          </div>
          <div className="p-field">
            <Button type="submit" style={{ width: '120px' }} label="Signup"  />
            <NavLink to="/" style={{ marginLeft: '10px' }}>Already have an account</NavLink>
          </div>
        </Card>
      </div>
    </form>
  )
}

export default Signup
