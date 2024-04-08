import axios from 'axios';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const useUserType = () => {
    const navigate=useNavigate();
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate user');
      }

      const data = await response.json();
        setUserType(data.type);

      localStorage.setItem("token",data.token) // Assuming the response includes a 'userType' field
      localStorage.setItem("username",username);
      if(data.type==="Student"){
        navigate("/student")
      }
      else if(data.type==="Teacher"){
        navigate("/teacher")
      }
      else{
        navigate("/admin")
      }
      
      
    } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
            // Server returned a meaningful error message
            alert(error.response.data.msg);
          } else {
            // Network error or unexpected response format
            alert('Error authenticating user:', error.message);
            alert('Failed to authenticate user. Please try again later.');
          }
    } finally {
      setLoading(false);
    }
  };

  return { userType, loading, loginUser };
};

export default useUserType;


export const useCourse=({id})=>{
  const [loading,setLoading]=useState(true)
  const [course,setCourse]=useState(null)
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/v1/course/${id}`,{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    .then(response=>{
     
      setCourse(response.data.course)
      setLoading(false)
    })
    
},[id])

return{
  loading,
  course
}


}