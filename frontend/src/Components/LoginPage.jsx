import React from "react";
import { useState } from "react";
import useUserType from "../hooks";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loading, loginUser } = useUserType();

    const Submithandler=async(e)=>{
        e.preventDefault();
     await  loginUser(username,password)
       
    }
  return (
    <div className="flex flex-col h-screen">
      <h1 className=" mx-auto font-bold text-4xl mb-28   justify-center  ">
        Login Here
      </h1>
      <div className="  w-[80%] h-[50%] mx-auto border-2 border-slate-400">
        <form className="pl-10 py-10 w-[80%]" onSubmit={ Submithandler}>
          <div className="w-[100%] flex flex-row items-center mb-20">
            <label className="block mb-1 text-md  text-black font-semibold  text-3xl ">
              Username:
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full p-3 ml-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
       dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Username"
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-[100%] flex flex-row items-center mb-20">
            <label className="block mb-1 text-md  text-black font-semibold  text-3xl ">
              Password:
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full p-3 ml-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
       dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Enter Username"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
           
            className="block mx-auto px-3 border-2 border-blue-600 bg-blue-600  text-white p-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
