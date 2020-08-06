import React, { Fragment } from 'react'
import { Card } from 'primereact/card'

export const LeftMessage = ({ message, time })=>(
  <Card className="message leftMessage">
    <div>{ message }</div>
    <div style={{ textAlign: 'right' }}>
      <small>{ time }</small>
    </div>
  </Card>
)

export const RightMessage = ({ message, time })=>(
  <Card className="message rightMessage">
    <div>{ message }</div>
    <div style={{ textAlign: 'right' }}>
      <small>{ time }</small>
    </div>
  </Card>
)
