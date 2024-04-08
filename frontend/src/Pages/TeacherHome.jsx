import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CourseCard from '../Components/CourseCard';

export default function TeacherHome() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const username = localStorage.getItem('username');

  const fetchCourses = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/teachercourses',{username});
      setCourses(response.data.courses);
    
    } catch (error) {
      alert('Error fetching courses:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold  text-center mb-20 text-fuchsia-800">Welcome, {username}</h1>
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-600">Following Are The Courses Assigned To You </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {courses && courses.length>0?(courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))):( <h1 className="text-3xl font-bold mb-6 text-center">No Courses Assigned</h1>)}
      </div>
    </div>
  );
}
