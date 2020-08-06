import React, { useState } from 'react'

const UserList = ({ returnUser })=>{
  const [users, setUsers] = useState([
    { id: 1, first_name: 'Prateek', last_name: 'Kaushik' },
    { id: 2, first_name: 'Prateek', last_name: 'Kaushik' },
    { id: 3, first_name: 'Prateek', last_name: 'Kaushik' },
  ])

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
