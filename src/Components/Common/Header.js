import React, { Fragment } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import {
  useDispatch,
  useSelector
} from "react-redux"
import { deleteAll } from '../../Redux/Actions/userActions'
import { deleteMessages } from '../../Redux/Actions/chatActions'

const Header = ()=>{
  const sender = useSelector(state => state.user.profile)
  const dispatch = useDispatch()

  const logout = ()=>{
    dispatch(deleteAll())
    dispatch(deleteMessages())
  }

  return (
    <Card className="header">
    <div className="p-grid">
      <div className="p-col">
        <h2>
          <i className="pi pi-users"></i>
          <span> ChatApp</span>
        </h2>
      </div>
      <div className="p-col" style={{ textAlign: 'right' }}>
        { sender && sender._id?
          <Fragment>
            <strong>Welcome {`${ sender.first_name } ${ sender.last_name } `}</strong>
            <Button label="Logout" icon="pi pi-power-off" onClick={ logout } style={{marginLeft:4}}/>
          </Fragment>
        :null }
      </div>
    </div>
    </Card>
  )
}

export default Header
