import React, { useEffect } from 'react'
import {
  useDispatch,
  useSelector
} from "react-redux"
import Chat from '../Chat/Chat'
import { fetchMessages } from '../../Redux/Actions/chatActions'

const Home = ({ history })=>{
  const sender = useSelector(state => state.user.profile)
  const dispatch = useDispatch()
  const messages = useSelector(state => state.chat.messages)

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
        getMessages={ (sender, receiver)=> dispatch(fetchMessages(sender, receiver)) }
        oldMessages={ messages }
        sender={ sender }
      />
      :null }
    </div>
  )
}

export default Home
