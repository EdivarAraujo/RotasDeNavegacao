import React from 'react'
import * as C from './styles'

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <C.Input
      value={value}
      onchange={onChange}
      type={type}
      placeholder={placeholder}
    />
  )
}

export default Input
