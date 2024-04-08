import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import CreationForm from "../Components/CreationForm";
import { useNavigate } from "react-router-dom";
import CreateCourse from "../Components/CreateCourse";
import Dashboard from "../Components/Dashboard";




export default function AdminHome() {
  const [selectItem,setSelectedItem]=useState('Dashboard')
  const renderComponent = () => {
    if (selectItem === "Dashboard") {
      return <Dashboard/>
    } else if(selectItem==='Student' || selectItem==='Teacher' ) {
      return <CreationForm type={selectItem} />;
    }
    else if(selectItem==='Course'){
      return <CreateCourse/>}
    else{
      logout()
    }


  };
  const handleSidebarItemClick = (item) => {
    setSelectedItem(item);
  };
  const navigate=useNavigate();

  const logout=()=>{
   
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    navigate('/login')
  }
  return (
    <div className="flex flex-row ">
      <div className="w-[20%]">
      <Sidebar onItemClick={handleSidebarItemClick}/></div>
      <div className=" flex w-[80%] ml-10 ">{renderComponent()}
     </div>
    </div>
  );
}


