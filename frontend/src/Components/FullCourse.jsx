import React from 'react'
import FeedbackForm from './FeedbackForm'

export default function FullCourse({course}) {
  return (
    <div>
      <div className='max-w-max mx-auto mb-20'>
            <div className="mb-6 flex flex-col justify-center items-center">
        <h2 className="text-3xl py-5  text-fuchsia-600 font-bold mb-2">{course.name}</h2>
        <p className="text-gray-600  text-xl">Teacher: {course.teacher}</p>
      </div>
      </div>
      <FeedbackForm courseName={course.name} id={course._id}/>

    </div>
  )
}
