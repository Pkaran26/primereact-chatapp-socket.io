import React, { useEffect } from 'react'
import {
  useDispatch,
  useSelector
} from "react-redux"
import {
  fetchUsers
} from '../../Redux/Actions/userActions'

const UserList = ({ returnUser })=>{
  const dispatch = useDispatch()
  const users = useSelector(state => state.user.users)

  useEffect(()=>{
    dispatch(fetchUsers())
  }, [dispatch])

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
