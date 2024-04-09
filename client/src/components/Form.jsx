import React from 'react'
import Input from './UI/Input'
import Button from './UI/Button'
import axios from "axios"
import {useRef,useEffect,useState} from "react"
import {toast} from "react-hot-toast"

const initailUserDetails = {
  name:"",
  email:"",
  phone:""
}
const Form = () => {
  const inputRef = useRef();
  const [userDetails , setUserDetails ] = useState(initailUserDetails);
  const [error , setError] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputValueChange = (e)=>{
    const {name,value} = e.target;
    setUserDetails(prev=>({...prev,[name]:value}));
    console.log(userDetails)
  }

  const handleFormSubmit =async (e)=>{
    console.log("on submit called")
    e.preventDefault();
    setError(null)
    if(userDetails.phone.length !== 10){
      return setError("phone number should be 10 digit long only")
    }
    try{
      const response = await axios.post("http://localhost:8000/api/v1/user/save-user",userDetails,{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(response.status ===201){
        toast.success(response.data.message);
        setUserDetails(initailUserDetails);
      }
      console.log(response)
    }catch(error){
      console.log(error)
      if(error.response.status === 400){
        toast.error(error.response.data.message)
      }else if(error.response.status === 401){
        toast.error(error.response.data.message)
      }else{
        toast.error(error.response.data.message)
      }
    }
  }

  return (
    // wrapper
    <div className="h-screen bg-[#F1F4FF] w-full flex items-center justify-center">
      <form onSubmit={handleFormSubmit} className="
      bg-[#ffffff] 
      w-full xs:[90%]  sm:w-2/3 md:w-1/2 lg:w-1/3
      p-5 h-2/3 min-h-fit
      flex flex-col gap-8
      rounded-lg shadow-lg
      ">
        <h1 className="text-2xl text-[#1F41BB] font-bold text-center">Enter User Details</h1>
       
        <div  className=" flex flex-col gap-3">
          <Input type="text"  onChange={handleInputValueChange} name="name"  value={userDetails.name} inputRef={inputRef}  placeholder="name" />
          <Input type="email" onChange={handleInputValueChange} name="email" value={userDetails.email} placeholder="email" />
          <Input type="number" onChange={handleInputValueChange} name="phone" value={userDetails.phone} placeholder="phone" />
          <span className="text-red-500 ">{error}</span>
        </div>
        <Button  type="submit" title="Save User"/>
      </form>
    </div>
  )
}

export default Form