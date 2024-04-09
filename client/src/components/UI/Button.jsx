import React from 'react'

const Button = ({title,type}) => {
  return (
    <button type={type} className="mt-4 outline-none bg-[#1F41BB] p-2 py-3 text-white font-bold rounded-lg ">{title}</button>
  )
}

export default Button