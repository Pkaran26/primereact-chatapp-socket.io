import React, { useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

const MessageForm = ({ sendMessage, userTyping })=>{
  const [message, setMessage] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    sendMessage(message)
    setMessage('')
  }

  return (
    <form className="message_form" method="POST" style={{ marginTop: '5px' }} onSubmit={ handleSubmit }>
      <div className="p-fluid">
        <div className="p-field">
          <InputTextarea
            value={ message }
            onChange={ (e) =>{
              setMessage(e.target.value)
              userTyping(true)
            }}
            onFocus={ (e) => userTyping(true) }
            onBlur={ (e) => userTyping(false) }
            autoResize={ true }
            required={ true }
            style={{ maxHeight: '50px' }}
            placeholder="enter message here..."
          />
          <Button type="submit" label="Send"  />
        </div>
      </div>
    </form>
  )
}

export default MessageForm
