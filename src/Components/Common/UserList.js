import React from 'react'

const UserList = ({ onlineUsers, returnUser })=>(
  <div className="userlist">
    <ul>
    { onlineUsers && onlineUsers.length>0?
      onlineUsers.map((e, i)=>(
        <li className="user" onClick={ (el)=> returnUser(e) } key={ i }>
          <span>
            { e.first_name } { e.last_name } <span className="message_count">{ e.message_count }</span>
          </span>
        </li>
      ))
    :null }
    </ul>
  </div>
)

export default UserList
