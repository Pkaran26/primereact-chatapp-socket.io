import React from 'react'
import { Card } from 'primereact/card'
import moment from 'moment'

export const LeftMessage = ({ message, time })=>(
  <Card className="message leftMessage">
    <div>{ message }</div>
    <div style={{ textAlign: 'right' }}>
      <small>{ moment(time).format('DD-MMM-YYYY hh:mm A') }</small>
    </div>
  </Card>
)

export const RightMessage = ({ message, time })=>(
  <Card className="message rightMessage">
    <div>{ message }</div>
    <div style={{ textAlign: 'right' }}>
      <small>{ moment(time).format('DD-MMM-YYYY hh:mm A') }</small>
    </div>
  </Card>
)
