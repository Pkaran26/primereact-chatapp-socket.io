import React from 'react'
import './App.css'
import Header from './Components/Common/Header'
import { Switch, Route } from 'react-router-dom'

import Login from './Components/User/Login'
import Signup from './Components/User/Signup'
import Home from './Components/User/Home'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" component={ (props)=> <Login { ...props } /> } exact/>
          <Route path="/signup" component={ (props)=> <Signup { ...props } /> } exact/>
          <Route path="/home" component={ (props)=> <Home { ...props } /> } exact/>
        </Switch>
      </div>
    </div>
  )
}

export default App
