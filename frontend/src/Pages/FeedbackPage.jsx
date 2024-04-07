import React from 'react'
import { useParams } from 'react-router-dom';
import { useCourse } from '../hooks';
import FullCourse from '../Components/FullCourse';

export default function FeedbackPage() {
  
  const {id}=useParams();
  const {loading,course}=useCourse({
    id:id ||"" }
  );
 
  if(loading || !course){
    return<div>
      <div>Loading...</div>
      
       </div>
  }
  return (
    <div>
    
      <FullCourse course={course}/>

    </div>
  )
}
