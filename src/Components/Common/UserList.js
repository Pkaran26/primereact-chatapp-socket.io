import React, { useState, useEffect } from 'react'

const UserList = ({ onlineUsers, returnUser })=>{
  const [users, setUsers] = useState([])

  useEffect(()=>{
    setUsers(onlineUsers)
  }, [onlineUsers])

  return (
    <div className="userlist">
      <ul>
      { users && users.length>0?
        users.map((e, i)=>(
          <li className="user" onClick={ (el)=> returnUser(e) } key={ i }>{ e.first_name } { e.last_name }</li>
        ))
      :null }
      </ul>
    </div>
  )
}

export default UserList
