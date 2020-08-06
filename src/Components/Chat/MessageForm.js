import React, { useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

const MessageForm = ({ sendMessage })=>{
  const [message, setMessage] = useState('')

  const handleSubmit = (e)=>{
    e.preventDetault()
    sendMessage(message)
  }

  return (
    <form className="message_form" style={{ marginTop: '5px' }} onSubmit={ handleSubmit }>
      <div className="p-fluid">
        <div className="p-field">
          <InputTextarea

            value={ message }
            onChange={ (e) => setMessage(e.target.value) }
            autoResize={ true }
            required={ true }
            placeholder="enter message here..."
          />
          <Button type="submit" label="Send"  />
        </div>
      </div>
    </form>
  )
}

export default MessageForm
