import React, { Fragment, Component } from 'react'
import socketIOClient from 'socket.io-client'
import moment from 'moment'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import UserList from '../Common/UserList'
import MessageForm from './MessageForm'
import {
  LeftMessage,
  RightMessage
} from './Message'
import {
  CONNECTION,
  USER_DETAIL,
  GET_USERS,
  GET_MESSAGE,
  SEND_MESSAGE,
  TYPING,
  USER_TYPING
} from './EventTypes'

class Chat extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentUser: '',
      messages: [],
      socketId: '',
      users: [],
      typing: false
    }
    this.socket = socketIOClient('http://localhost:8181')
  }

  componentDidMount(){
    const { sender } = this.props

    this.socket.on(CONNECTION, ()=>{
      this.setState({ socketId: this.socket.id })
      if(sender){
        this.socket.emit(USER_DETAIL, {
          ...sender,
          message_count: 0,
          socket_id: this.socket.id
        })
      }
    })

    this.socket.on(GET_USERS, (data)=>{
      if(data && data.length>0){
        const filteredUser = data.filter((e)=>{
          return e._id !== sender._id
        })
        this.setState({
          users: filteredUser
        })
      }
    })

    this.socket.on(USER_TYPING, (data)=>{
      this.setState({
        typing: data
      })
    })

    this.socket.on(GET_MESSAGE, (data)=>{
      const { currentUser, users } = this.state
      if(currentUser){
        this.setState({
          messages: [...this.state.messages, data]
        })
      }else{
        for (var i = 0; i < users.length; i++) {
          if(users[i]._id === data.sender._id){
            users[i].message_count = users[i].message_count + 1
            this.setState({ users })
            break
          }
        }
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.oldMessages && nextProps.oldMessages.messages && nextProps.oldMessages.messages.length>0){
      this.setState({
        messages: nextProps.oldMessages.messages
      })
    }
  }

  getOldMessages = (e)=>{
    this.setState({ currentUser: e })
    const { getMessages, sender } = this.props
    getMessages(sender._id, e._id)
    const { users } = this.state

    for (var i = 0; i < users.length; i++) {
      if(users[i]._id === e._id){
        users[i].message_count = 0
        this.setState({ users })
        break
      }
    }

  }

  sendMessage = (message)=>{
    const payload = {
      sender: { ...this.props.sender },
      receiver: { ...this.state.currentUser },
      message: message,
      time: moment().toISOString()
    }
    this.setState({
      messages: [...this.state.messages, payload]
    })
    this.socket.emit(SEND_MESSAGE, payload)
  }

  userTyping = (status)=>{
    const payload = {
      sender: { ...this.props.sender },
      receiver: { ...this.state.currentUser },
      typing: status
    }

    this.socket.emit(TYPING, payload)
  }

  render(){
    const { currentUser, messages, users, typing } = this.state
    return (
      <Card className="chat_container" style={{ width: !currentUser? '200px': '500px'}}>
        <div className="p-grid">
        { currentUser?
          <div className="p-col-8">
            <div className="chat_header">
              <h3>{ currentUser?
                `${ currentUser.first_name } ${ currentUser.last_name }`
              : '...'}</h3>
              { typing?
                <span>typing...</span>
              :null }
              <Button icon="pi pi-times-circle" onClick={ ()=> this.setState({ currentUser: '' }) } />
            </div>
            <div className="messages">
              { messages && messages.length>0?
                messages.map((e, i)=>(
                  <Fragment key={ i }>
                    { e.receiver._id !== currentUser._id?
                      <LeftMessage { ...e } />
                    :
                      <RightMessage { ...e } />
                    }
                  </Fragment>
                ))
              :null }
            </div>
            <MessageForm
              userTyping={ this.userTyping }
              sendMessage={ this.sendMessage }
            />
          </div>
        :null }
          <div className={ currentUser? "p-col-4": "p-col" }>
            <UserList
              onlineUsers={ users }
              returnUser={ this.getOldMessages }
            />
          </div>
        </div>
      </Card>
    )
  }
}

export default Chat
