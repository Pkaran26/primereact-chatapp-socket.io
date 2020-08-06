import React, { useEffect } from 'react'
import {
  useSelector
} from "react-redux"
import Chat from '../Chat/Chat'

const Home = ({ history })=>{
  const sender = useSelector(state => state.user.profile)

  useEffect(()=>{
    if(Object.keys(sender).length === 0){
      history.push('/')
    }
    console.log(sender);
  }, [])

  return (
    <div>
      <Chat />
    </div>
  )
}

export default Home
