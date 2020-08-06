import React, { Fragment } from 'react'
import { Card } from 'primereact/card'

export const LeftMessage = ({ message, time })=>(
  <Card className="message leftMessage">
    <div>{ message }</div>
    <small>{ time }</small>
  </Card>
)

export const RightMessage = ({ message, time })=>(
  <Card className="message rightMessage">
    <div>{ message }</div>
    <small>{ time }</small>
  </Card>
)
