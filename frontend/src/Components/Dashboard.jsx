import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/totalcourses",

        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if res.data is an array before setting the state
      if (Array.isArray(res.data.courses)) {
        setCourses(res.data.courses);
      } else {
        alert("Response data is not an array:", res.data);
      }
    } catch (error) {
      alert("Error fetching courses:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Course List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-600 mb-2">Teacher: {course.teacher}</p>
              <p className="text-gray-600 mb-2">Semester: {course.semester}</p>
              <div className="flex items-center">
                <span className="text-gray-600">Rating:{course.rating}</span>
                <div className="ml-2">
                  {[...Array(course.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0l2.56 6.616L20 7.36l-5.52 4.512L15.84 20 10 16.64 4.16 20l1.36-8.128L0 7.36l7.44-.744L10 0z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-3">
              <p className="text-sm text-gray-600">Enrolled: {course.enrolled}</p>
              <p className="text-sm text-gray-600">Submission: {course.submission}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
