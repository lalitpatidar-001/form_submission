import React from 'react'

const Input = ({label,inputRef,type,value,onChange,name, placeholder}) => {
    return (
       
            <input type={type} required={true} name={name} value={value} onChange={onChange} ref={inputRef} placeholder={placeholder} className="bg-[#F1F4FF] w-full p-2 py-3 rounded-lg focus:outline-1 focus:outline-blue-600 shadow-sm"/>
    )
}

export default Input