import React from 'react'

const UserList = ({ onlineUsers, returnUser })=>(
  <div className="userlist">
    <ul>
    { onlineUsers && onlineUsers.length>0?
      onlineUsers.map((e, i)=>(
        <li className="user" onClick={ (el)=> returnUser(e) } key={ i }>
          <span>
            { e.first_name } { e.last_name }&nbsp;
            { e.message_count>0?
              <span className="message_count">{ e.message_count }</span>
            :null }
          </span>
        </li>
      ))
    :
      <li className="user" style={{ cursor: 'default' }}>
        All users are offline
      </li>
    }
    </ul>
  </div>
)

export default UserList
