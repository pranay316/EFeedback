import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    semester: "",
    enrolled: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [teacherIds, setTeacherIds] = useState([""]);

  useEffect(() => {
    fetchTeacherIds();
  }, []);
  const token = localStorage.getItem("token");

  const fetchTeacherIds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/teachers",
        {
          headers: {
            Authorization: token, // Example of an Authorization header
            "Content-Type": "application/json", // Example of a Content-Type header
          },
        }
      ); // Adjust the API endpoint accordingly
      setTeacherIds(response.data.teachers);
    } catch (err) {
     alert("Error fetching teacher IDs:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/createcourse",
        formData,
        {
          headers: {
            Authorization: token, // Example of an Authorization header
            "Content-Type": "application/json", // Example of a Content-Type header
          },
        }
      );

      alert(res.data.msg);
      // Handle success, e.g., show a success message to the user
    } catch (err) {
      alert(err);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="w-[100%] border-2">
      <h1 className="block mx-auto border-2  w-max text-3xl font-bold text-emerald-600">
        Enter the details for creating Course
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-32 p-10 border-2 w-[70%] "
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Title:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div
          className="mb-4 "
          style={{ maxHeight: "150px", overflowY: "auto" }}
        >
          <label
            htmlFor="teacher"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            TeacherId:
          </label>
          <select
            id="teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" className="h-[10px] overflow-hidden">
              Select Teacher
            </option>
            {teacherIds && teacherIds.length > 0 ? (
              teacherIds.map((teacher, index) => (
                <option key={index} value={teacher}>
                  {teacher}
                </option>
              ))
            ) : (
              <option disabled>No teachers available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="semester"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Semester:
          </label>
          <input
            type="text"
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="enrolled"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Total Enrolled:
          </label>
          <input
            type="text"
            id="enrolled"
            name="enrolled"
            value={formData.enrolled}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
