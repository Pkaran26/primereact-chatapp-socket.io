import React, { useState, useEffect } from 'react'
import {
  useDispatch,
  useSelector
} from "react-redux"
import {
  fetchUsers
} from '../../Redux/Actions/userActions'

const UserList = ({ socket, returnUser })=>{
  const dispatch = useDispatch()
  const list = useSelector(state => state.user.users)
  const [users, setUsers] = useState([])

  useEffect(()=>{
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(()=>{
    setUsers(list)
  }, [list])

  useEffect(()=>{

  }, [])

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
