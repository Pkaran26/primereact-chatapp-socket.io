import React from 'react'
import { Card } from 'primereact/card'

const Header = ()=>{

  return (
    <Card className="header">
      <h2>
        <i className="pi pi-users"></i>
        <span> ChatApp</span>
      </h2>
    </Card>
  )
}

export default Header
