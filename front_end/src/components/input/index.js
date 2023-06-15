import React from "react";

import './input.scss'

export const InputComponent = ({ label }) => {
  return (
    <div className='input'>
      <input type='text' required="" autocomplete="off" />
      <label for="name">{label}</label>
    </div>
  )
}