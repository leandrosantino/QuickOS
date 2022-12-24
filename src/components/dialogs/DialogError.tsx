import React from 'react'
import { InputButton } from '../forms/InputButton'

export  function DialogError({message, title, callback}:DialogProps) {
  return (
    <div
      className="
        w-full h-full

      "
    >

      {title} <br/>
      {message}

      <InputButton
        title='OK'
        onClick={()=>callback(true)}
      />

    </div>
  )
}
