import React from 'react'
import { InputButton } from '../forms/InputButton'

export function DialogQuestion({message, title, callback}:DialogProps) {
  return (
    <div
      className="
        w-full h-full

      "
    >

      {title} <br/>
      {message}      
      
      <InputButton
        title='cancel'
        onClick={()=>callback(false)}
      />

      <InputButton
        title='OK'
        onClick={()=>callback(true)}
      />

    </div>
  )
}
