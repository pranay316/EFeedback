import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StudentHome() {
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState([]);
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const fetchCoursesBySemester = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/allcourses?semester=${semester}`
      );
      setCourses(res.data.semestercourses.courses);
    } catch (error) {
      alert("Error fetching courses:", error);
    }
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCoursesBySemester();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Course List</h1>
      <div className="flex justify-center mb-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <label htmlFor="semester" className="font-semibold">
            Select Semester:
          </label>
          <select
            id="semester"
            name="semester"
            value={semester}
            onChange={handleSemesterChange}
            className="shadow border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
          >
            <option value="">-- Select Semester --</option>
            {semesters.map((sem, index) => (
              <option key={index} value={sem}>
                {sem}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Show Courses
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-6">
  {courses.length > 0 ? (
    courses.map((course, index) => (
      <Link to={`/course/${course._id}`}>
      <div key={index} className="flex flex-row bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
          <p className="text-gray-600 mb-2">Teacher: {course.teacher}</p>
          <p className="text-gray-600 mb-2">Semester: {course.semester}</p>
        </div>
      </div>
      </Link>
    ))
  ) : (
    <div className="text-center text-xl font-bold text-red-600">
      Select the semester to view courses
    </div>
  )}
</div>
    </div>
  );
}

export default StudentHome;
