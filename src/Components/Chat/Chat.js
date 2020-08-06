import React, { Fragment, useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { Card } from 'primereact/card'
import UserList from '../Common/UserList'
import MessageForm from './MessageForm'
import {
  LeftMessage,
  RightMessage
} from './Message'
import {
  CONNECTION,
  SEND_MESSAGE
} from './EventTypes'
import {
  useSelector
} from "react-redux"

const Chat = ()=>{
  const [currentUser, setCurrentUser] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: { id: 1, first_name: 'Prateek' }, receiver: { id: 2, first_name: 'Karan' }, message: 'Hello Karan', time: '2020-07-07 12:04 PM' },
    { id: 1, sender: { id: 2, first_name: 'Karan' }, receiver: { id: 1, first_name: 'Prateek' }, message: 'Hello Prateek', time: '2020-07-07 12:04 PM' },
    { id: 1, sender: { id: 1, first_name: 'Prateek' }, receiver: { id: 2, first_name: 'Karan' }, message: 'How are you?', time: '2020-07-07 12:04 PM' },
    { id: 1, sender: { id: 2, first_name: 'Karan' }, receiver: { id: 1, first_name: 'Prateek' }, message: 'fine, thank you', time: '2020-07-07 12:04 PM' },
  ])
  const sender = useSelector(state => state.user.profile)
  const socket = socketIOClient('http://localhost:8181');

  useEffect(()=>{
    socket.on(CONNECTION, ()=>{
      console.log(socket.id)
    })
  }, [])

  const sendMessage = (message)=>{
    const payload = {
      sender: { ...sender },
      receiver: { ...currentUser },
      message: message
    }
    socket.emit(SEND_MESSAGE, payload)
  }

  return (
    <Card className="chat_container">
      <div className="p-grid">
        <div className="p-col-8">
          <div className="chat_header">
            <h3>{ currentUser?
              `${ currentUser.first_name } ${ currentUser.last_name }`
            : '...'}</h3>
          </div>
          <div className="messages">
            { messages && messages.length>0?
              messages.map((e, i)=>(
                <Fragment key={ i }>
                { i%2===0?
                  <LeftMessage { ...e } />
                :
                  <RightMessage { ...e } />
                }
                </Fragment>
              ))
            :null }
          </div>
          <MessageForm
            sendMessage={ sendMessage }
          />
        </div>
        <div className="p-col-4">
          <UserList
            returnUser={ (e)=> setCurrentUser(e) }
          />
        </div>
      </div>
    </Card>
  )
}

export default Chat
