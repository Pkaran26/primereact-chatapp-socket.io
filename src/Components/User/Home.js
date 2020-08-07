import React, { useEffect } from 'react'
import {
  useSelector
} from "react-redux"
import Chat from '../Chat/Chat'

const Home = ({ history })=>{
  const sender = useSelector(state => state.user.profile)

  useEffect(()=>{
    if(!sender){
      history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      { sender?
      <Chat
        sender={ sender }
      />
      :null }
    </div>
  )
}

export default Home
