import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'

const Loader = ()=>(
  <div className="loader">
    <ProgressSpinner/><br/>
    <strong>Loading...</strong>
  </div>
)

export default Loader
