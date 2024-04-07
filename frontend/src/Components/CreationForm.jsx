import React, { useState } from "react";
import axios from "axios";


export default function CreationForm({ type }) {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const token=localStorage.getItem('token')
    try{
    if(type==='Student'){
      
      const res = await axios.post(
        'http://localhost:4000/api/v1/createstudent',
        { username, password },
        {
          headers: {
            'Authorization': token, // Example of an Authorization header
            'Content-Type': 'application/json', // Example of a Content-Type header
          }
        }
      );
     
      if(res.status===200){
        alert(res.data.msg)
      }

      
    }
    else if(type==='Teacher'){
      const res = await axios.post(
        'http://localhost:4000/api/v1/createteacher',
        { username, password },
        {
          headers: {
            'Authorization': token, // Example of an Authorization header
            'Content-Type': 'application/json', // Example of a Content-Type header
          }
        }
      );
      if(res.status===200){
        alert(res.data.msg)
      }
    }
  }catch(err){
   alert(err)
  }
  setUsername('')
  setPassword('')
}

  return (
    <div className="pt-6  w-[100%] px-80">
      <h1 className=" font-bold  block mx-auto  w-max  text-red-600 text-2xl">
        Enter the details for creating the {type}
      </h1>
      <form className=" mt-36 font-semibold text-xl  border-2 p-6 pt-20 h-[50%] items-start" onSubmit={handleSubmit}>
        <div className="w-[100%] flex flex-row items-center mb-20">
          <label className="block mb-1 text-md  text-black font-semibold  text-3xl ">
            Username:
          </label>
          <input
            type="text"
            id="first_name"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="block w-full p-3 ml-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
       dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Username"
           
            required
          />
        </div>
        <div className="w-[100%] flex flex-row items-center mb-20">
          <label className="block mb-1 text-md  text-black font-semibold  text-3xl ">
            Password:
          </label>
          <input
            type="text"
            onChange={(e)=>setPassword(e.target.value)}
            id="first_name"
            value={password}
            className="block w-full p-3 ml-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
       dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="Enter Password"
        
            required
          />
        </div>
        <button
          type="submit"
          className="block mx-auto px-3 border-2 border-blue-600 bg-blue-600  text-white p-2 rounded-lg"
        >
          Create {type}
        </button>
      </form>
    </div>
  );
}
