import React, { Fragment, useState } from 'react'
import { Card } from 'primereact/card'
import UserList from '../Common/UserList'
import MessageForm from './MessageForm'
import {
  LeftMessage,
  RightMessage
} from './Message'

const Chat = ()=>{
  const [currentUser, setCurrentUser] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: { id: 1, first_name: 'Prateek' }, receiver: { id: 2, first_name: 'Karan' }, message: 'Hello Karan', time: '2020-07-07 12:04 PM' },
    { id: 1, sender: { id: 2, first_name: 'Karan' }, receiver: { id: 1, first_name: 'Prateek' }, message: 'Hello Prateek', time: '2020-07-07 12:04 PM' },
    { id: 1, sender: { id: 1, first_name: 'Prateek' }, receiver: { id: 2, first_name: 'Karan' }, message: 'How are you?', time: '2020-07-07 12:04 PM' },
    { id: 1, sender: { id: 2, first_name: 'Karan' }, receiver: { id: 1, first_name: 'Prateek' }, message: 'fine, thank you', time: '2020-07-07 12:04 PM' },
  ])

  const sendMessage = (message)=>{
    const payload = {
      sender: {},
      receiver: {},
      message: message
    }
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
